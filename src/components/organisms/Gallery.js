import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
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

const Gallery = ({ photos }) => {
  const shownElements = photos.slice(0, 15);
  const imgElems = shownElements.map(photo => (
    <StyledImg
      src={photo.img_src}
      key={photo.id}
      alt={`Mars by rover ${photo.rover.name}`}
    />
  ));
  return (
    <StyledPerfectScrollbar>
      <StyledResponsiveMasonry
        columnsCountBreakPoints={{ 350: 2, 900: 3, 1100: 4 }}
      >
        <Masonry gutter="0.3rem">{imgElems}</Masonry>
      </StyledResponsiveMasonry>
    </StyledPerfectScrollbar>
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
  )
};
