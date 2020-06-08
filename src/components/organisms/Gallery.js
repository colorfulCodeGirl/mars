import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import gsap from "gsap";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import PhotoModal from "../molecules/PhotoModal";
import Mars from "../atoms/Mars";
import MarsSmall from "../atoms/MarsSmall";
import { Transition } from "react-transition-group";

const StyledLazyImg = styled(LazyLoadImage)`
  width: 100%;
  border-radius: 0.3rem;
`;

const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  width: 95%;
  margin: 0 auto;
`;

export const chooseNextPhotos = (newPhotos, length) => {
  const nextStartIndex = length === 0 ? 0 : length;
  const hasMorePhotos =
    newPhotos.length >= nextStartIndex + 8 || newPhotos.length === 0;
  const nextEndIndex = hasMorePhotos ? nextStartIndex + 8 : newPhotos.length;
  const nextPhotos = newPhotos.slice(nextStartIndex, nextEndIndex);
  return { hasMorePhotos, nextPhotos };
};

export const Gallery = ({ photos, isMobile }) => {
  const [shownPhotos, setShownPhotos] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [fullImage, setFullImage] = useState({});
  const imgContainer = useRef(null);

  useEffect(() => {
    let timer;
    if (photos.length === 0) {
      setShowAnimation(true);
    } else {
      timer = setTimeout(() => {
        setShowAnimation(false)}, 1000);
    }
    const { hasMorePhotos, nextPhotos } = chooseNextPhotos(photos, 0);
    setShownPhotos([...nextPhotos]);
    setHasMore(hasMorePhotos);
    return () => clearTimeout(timer);
  }, [photos]);

  const openFullImage = (e) => {
    const {
      dataset: { index },
    } = e.target;
    setFullImage({ img: shownPhotos[index], index: +index });
  };

  const findDirection = (x) => {
    const halfPoint = window.innerWidth / 2;
    return x >= halfPoint ? "right" : "left";
  };

  const changeFullImage = (side) => {
    const index = +fullImage.index;
    const direction = typeof side === "number" ? findDirection(side) : side;
    if (
      (index === 0 && direction === "left") ||
      (index === photos.length - 1 && direction === "right")
    ) {
      return;
    }
    const nextIndex = direction === "right" ? index + 1 : index - 1;
    setFullImage({ img: photos[nextIndex], index: nextIndex });
  };

  // needed to fill whole page if on first render was not enough photos
  // fires on load on last image in a group
  const checkIfPageIsFilled = (index) => {
    if (index === shownPhotos.length - 1) {
      return () => {
        const {
          bottom,
        } = imgContainer.current.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (bottom < windowHeight) {
          addPhotosOnScroll();
        }
      };
    }
  };

  const imgElems = shownPhotos.map((photo, index) => (
    <StyledLazyImg
      src={photo.img_src}
      key={photo.id}
      effect="blur"
      alt={`Mars by rover ${photo.rover.name}`}
      onClick={openFullImage}
      data-index={index}
      afterLoad={checkIfPageIsFilled(index)}
    />
  ));

  const addPhotosOnScroll = () => {
    const length = shownPhotos.length;
    const { hasMorePhotos, nextPhotos } = chooseNextPhotos(photos, length);
    setShownPhotos([...shownPhotos, ...nextPhotos]);
    setHasMore(hasMorePhotos);
  };

  return (
    <section data-testid="gallery">
      {!isMobile ? <Transition
        unmountOnExit
        timeout={3000}
        in={showAnimation}
        onEnter={(node) => gsap.set(node, {autoAlpha: 0})}
        addEndListener={(node, done) => {
          gsap.to(node, {
            duration: showAnimation ? 0.5 : 1,
            autoAlpha: showAnimation ? 1 : 0,
            onComplete: done,
          });
        }}
      >
        <Mars />
      </Transition> :
      <Transition
        unmountOnExit
        timeout={3000}
        in={showAnimation}
        onEnter={(node) => gsap.set(node, {autoAlpha: 0})}
        addEndListener={(node, done) => {
          gsap.to(node, {
            duration: showAnimation ? 0.5 : 1,
            autoAlpha: showAnimation ? 1 : 0,
            onComplete: done,
          });
        }}
      >
        <MarsSmall fullHeight={isMobile} />
      </Transition>}
      <Transition
        timeout={3000}
        in={!showAnimation}
        appear={true}
        onEnter={(node) => {
          gsap.set(node, { autoAlpha: 0 });
        }}
        addEndListener={(node, done) => {
         gsap.to(
            node,
            { duration: 1, autoAlpha: !showAnimation ? 1 : 0, onComplete: done },
          );
        }}
      >
        <InfiniteScroll
          dataLength={shownPhotos.length}
          next={addPhotosOnScroll}
          hasMore={hasMore}
          height={isMobile ? "88vh" : "97vh"}
          data-testid="scroll-container"
        >
          <StyledResponsiveMasonry
            ref={imgContainer}
            columnsCountBreakPoints={{ 350: 2, 900: 3, 1100: 4 }}
          >
            <Masonry gutter="0.3rem">{imgElems}</Masonry>
          </StyledResponsiveMasonry>
        </InfiniteScroll>
      </Transition>
      {fullImage.index >= 0 && (
        <PhotoModal
          closeHandler={() => setFullImage({})}
          changeHandler={changeFullImage}
          image={fullImage.img}
          index={fullImage.index}
          isMobile={isMobile}
          last={photos.length - 1}
        />
      )}
    </section>
  );
};

const mapStateToProps = ({ photos }) => ({
  photos,
});

export default connect(mapStateToProps)(Gallery);

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img_src: PropTypes.string.isRequired,
      rover: PropTypes.object,
    })
  ).isRequired,
  isMobile: PropTypes.bool,
};
