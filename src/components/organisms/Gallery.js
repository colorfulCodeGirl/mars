import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

const StyledGallery = styled.div`
  width: 100%;
  padding: 1rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, auto);
  align-content: start;
  img {
    width: 100%;
  }
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, auto);
  }
`;

const Gallery = ({ photos }) => {
  const shownElements = photos.slice(0, 15);
  const imgElems = shownElements.map(photo => (
    <img
      src={photo.img_src}
      key={photo.id}
      alt={`Mars by rover ${photo.rover.name}`}
    />
  ));
  return (
    <PerfectScrollbar>
      <StyledGallery>{imgElems}</StyledGallery>;
    </PerfectScrollbar>
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
