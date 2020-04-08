import React from "react";
import ModalOverlay from "../atoms/ModalOverlay";
import styled from "styled-components";

const PhotoWrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: #fff;
`;

const StyledImage = styled.img`
  max-width: 80vw;
  max-height: 86vh;
  margin: 1.5rem;
  margin-top: 3.5rem;
  @media (min-width: 900px) {
    margin: 2rem;
    margin-right: 4rem;
  }
`;

const PhotoModal = ({ src, closeHandler }) => (
  <ModalOverlay closeHandler={closeHandler}>
    <PhotoWrapper>
      <StyledImage src={src} alt="mars" />
    </PhotoWrapper>
  </ModalOverlay>
);

export default PhotoModal;
