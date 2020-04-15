/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/blur.css";

import { usePrevious } from "../../custom-hooks";
import PhotoModal from "../molecules/PhotoModal";

const StyledImg = styled(LazyLoadImage)`
  width: 100%;
  border-radius: 0.3rem;
`;

const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  width: 95%;
  margin: 0 auto;
`;

const chooseNextPhotos = (newPhotos, length) => {
  const nextStartIndex = length === 0 ? 0 : length;
  const hasMorePhotos =
    newPhotos.length >= nextStartIndex + 8 || newPhotos.length === 0;
  const nextEndIndex = hasMorePhotos ? nextStartIndex + 8 : newPhotos.length;
  const nextPhotos = newPhotos.slice(nextStartIndex, nextEndIndex);
  return { hasMorePhotos, nextPhotos };
};

const Gallery = ({ photosObj: { photos, hash }, isMobile }) => {
  const [shownPhotos, setShownPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [fullImage, setFullImage] = useState({});

  const length = shownPhotos.length;
  const prevHash = usePrevious(hash);

  useEffect(() => {
    if (prevHash !== hash) {
      const { hasMorePhotos, nextPhotos } = chooseNextPhotos(photos, length);
      setShownPhotos([...nextPhotos]);
      setHasMore(hasMorePhotos);
    }
  }, [hash, prevHash, photos, length]);

  const openFullImage = (e) => {
    const {
      src,
      dataset: { index },
    } = e.target;
    setFullImage({ src, index });
  };

  const closeFullImage = () => {
    setFullImage({});
  };

  const findDirection = (x) => {
    const halfPoint = window.innerWidth / 2;
    return x >= halfPoint ? "right" : "left";
  };

  const changeFullImage = (e, side) => {
    e.stopPropagation();
    const { index } = fullImage;
    const direction = typeof side === "number" ? findDirection(side) : side;
    if (
      (index == 0 && direction === "left") ||
      (index === photos.length - 1 && direction === "right")
    ) {
      return;
    }
    const nextIndex = direction === "right" ? +index + 1 : +index - 1;
    const nextImage = photos[nextIndex].img_src;
    setFullImage({ src: nextImage, index: nextIndex });
  };

  const imgElems = shownPhotos.map((photo, index) => (
    <StyledImg
      src={photo.img_src}
      key={photo.id}
      effect="blur"
      alt={`Mars by rover ${photo.rover.name}`}
      onClick={openFullImage}
      data-index={index}
    />
  ));

  const addPhotosOnScroll = () => {
    const { hasMorePhotos, nextPhotos } = chooseNextPhotos(photos, length);
    const oldPhotos = prevHash === hash ? shownPhotos : [];
    setShownPhotos([...oldPhotos, ...nextPhotos]);
    setHasMore(hasMorePhotos);
  };

  return (
    <>
      <InfiniteScroll
        dataLength={shownPhotos.length}
        next={addPhotosOnScroll}
        hasMore={hasMore}
        height={isMobile ? "88vh" : "97vh"}
      >
        <StyledResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 900: 3, 1100: 4 }}
        >
          <Masonry gutter="0.3rem">{imgElems}</Masonry>
        </StyledResponsiveMasonry>
      </InfiniteScroll>
      {fullImage.src && (
        <PhotoModal
          closeHandler={closeFullImage}
          changeHandler={changeFullImage}
          image={fullImage}
          isMobile={isMobile}
        />
      )}
    </>
  );
};

export default Gallery;

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img_src: PropTypes.string.isRequired,
      rover: PropTypes.object,
    })
  ),
  isMobile: PropTypes.bool,
};
