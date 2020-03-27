import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const StyledImg = styled.img`
  width: 100%;
  border-radius: 0.3rem;
`;

const StyledResponsiveMasonry = styled(ResponsiveMasonry)`
  width: 95%;
  margin: 0 auto;
`;

const StyledPerfectScrollbar = styled(PerfectScrollbar)`
  width: 100%;
`;

const Gallery = ({ photos, isMobile }) => {
  const [shownPhotos, setShownPhotos] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const addNewPhotos = () => {
    // setShownPhotos([]);
    const length = shownPhotos.length;
    const nextStartIndex = length === 0 ? 0 : length;
    const hasMoreForNext =
      photos.length >= nextStartIndex + 10 || photos.length === 0;
    const nextEndIndex = hasMoreForNext ? nextStartIndex + 10 : photos.length;
    const nextPhotos = photos.slice(nextStartIndex, nextEndIndex);
    console.log({ photos, shownPhotos, hasMore, hasMoreForNext, nextPhotos });
    setHasMore(hasMoreForNext);
    setShownPhotos([...shownPhotos, ...nextPhotos]);
  };

  useEffect(addNewPhotos, [photos]);

  const imgElems = shownPhotos.map(photo => (
    <StyledImg
      src={photo.img_src}
      key={photo.id}
      alt={`Mars by rover ${photo.rover.name}`}
    />
  ));
  return (
    <InfiniteScroll
      dataLength={shownPhotos.length}
      next={addNewPhotos}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      height={isMobile ? "88vh" : "97vh"}
    >
      <StyledPerfectScrollbar>
        <StyledResponsiveMasonry
          columnsCountBreakPoints={{ 350: 2, 900: 3, 1100: 4 }}
        >
          <Masonry gutter="0.3rem">{imgElems}</Masonry>
        </StyledResponsiveMasonry>
      </StyledPerfectScrollbar>
    </InfiniteScroll>
  );
};

export default Gallery;

Gallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      img_src: PropTypes.string.isRequired,
      rover: PropTypes.object
    })
  ),
  isMobile: PropTypes.bool
};
