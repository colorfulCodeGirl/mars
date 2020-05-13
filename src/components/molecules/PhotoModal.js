import React from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../atoms/ModalOverlay";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

const PhotoWrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: #fff;
  display: flex;
`;

const StyledImage = styled.img`
  max-width: 80vw;
  max-height: 90vh;
  margin: 1.5rem;
  margin-top: 4.5rem;
  @media (min-width: 900px) {
    margin: 2rem;
  }
`;

const ArrowButton = styled.button`
  width: 3rem;
  height: 10rem;
  margin: 0.5rem;
  background-color: transparent;
  border: none;
  padding: 0;
  align-self: center;
  svg {
    height: 100%;
    width: 100%;
    transform: ${(props) => (props.right ? "rotate(180deg)" : "")};
    stroke: ${(props) => (props.disabled ? "#C0C0C0" : "#515050")};
    stroke-width: 2.5rem;
  }
`;

const StyledDescription = styled.div`
  max-width: 250px;
`;

const PhotoModal = ({
  image: { img_src: src, rover },
  index,
  closeHandler,
  changeHandler,
  isMobile = false,
}) => (
  <ModalOverlay closeHandler={closeHandler}>
    <PhotoWrapper>
      {!isMobile && (
        <ArrowButton
          disabled={index === 0}
          onClick={() => changeHandler("left")}
          aria-label="left"
        >
          <Arrow />
        </ArrowButton>
      )}
      <StyledImage
        src={src}
        alt={`Mars by rover ${rover.name}`}
        onClick={(e) => changeHandler(e.clientX)}
        data-testid="full-img"
      />
      <StyledDescription>
        <h2>{`Mars by rover ${rover.name}`}</h2>
        <p>{`Photo taken on ,  days from landing.`}</p>
        <p>{`By camera `}</p>
      </StyledDescription>
      {!isMobile && (
        <ArrowButton
          right
          onClick={() => changeHandler("right")}
          aria-label="right"
        >
          <Arrow />
        </ArrowButton>
      )}
    </PhotoWrapper>
  </ModalOverlay>
);

export default PhotoModal;

PhotoModal.propTypes = {
  image: PropTypes.shape({
    img_src: PropTypes.string.isRequired,
    rover: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
};
