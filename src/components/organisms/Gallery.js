import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { usePrevious } from "../../CustomHooks";
import Loader from "../../components/atoms/Loader/Loader";
import PhotoModal from "../molecules/PhotoModal";

const StyledImg = styled.img`
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
    newPhotos.length >= nextStartIndex + 10 || newPhotos.length === 0;
  const nextEndIndex = hasMorePhotos ? nextStartIndex + 10 : newPhotos.length;
  const nextPhotos = newPhotos.slice(nextStartIndex, nextEndIndex);
  return { hasMorePhotos, nextPhotos };
};

const Gallery = ({ photosObj: { photos, hash }, isMobile }) => {
  const [shownPhotos, setShownPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [fullImageSrc, setFullImageSrc] = useState("");

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
    const { src } = e.target;
    setFullImageSrc(src);
  };

  const closeFullImage = () => {
    setFullImageSrc("");
  };

  const imgElems = shownPhotos.map((photo) => (
    <StyledImg
      src={photo.img_src}
      key={photo.id}
      alt={`Mars by rover ${photo.rover.name}`}
      onClick={openFullImage}
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
        loader={<Loader />}
        height={isMobile ? "88vh" : "97vh"}
      >
        <StyledResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 900: 3, 1100: 4 }}
        >
          <Masonry gutter="0.3rem">{imgElems}</Masonry>
        </StyledResponsiveMasonry>
      </InfiniteScroll>
      {fullImageSrc && (
        <PhotoModal closeHandler={closeFullImage} src={fullImageSrc} />
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
