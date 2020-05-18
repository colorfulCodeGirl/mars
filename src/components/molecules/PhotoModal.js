import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ModalOverlay from "../atoms/ModalOverlay";
import styled from "styled-components";
import FullImage from "../atoms/FullImage";
import ArrowButton from "../atoms/ArrowButton";
import { Transition } from "react-transition-group";
import gsap from "gsap";

const PhotoWrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: #fff;
  display: flex;
`;

const StyledDescription = styled.div`
  margin: 1.5rem;
  margin-top: 0;
  color: #515050;
  @media (min-width: 900px) {
    margin: 2rem;
  }
  h2 {
    text-transform: uppercase;
    padding-bottom: 1.5rem;
  }
`;

const startState = { opacity: 0, scale: 0.9 };

const PhotoModal = ({
  image: { img_src: src, sol, earth_date, rover, camera },
  index,
  closeHandler,
  changeHandler,
  isMobile = false,
  last,
}) => {
  const [show, setShow] = useState(true);
  const fullImg = useRef(null);

  const handleClose = () => {
    setShow(false);
    closeHandler();
  };

  const handleChange = (side) => {
    const openNext = () => {
      changeHandler(side);
      gsap.to(fullImg.current, {
        duration: 0.4,
        opacity: 1,
        scale: 1,
      });
    };
    gsap.to(fullImg.current, {
      duration: 0.4,
      opacity: 0,
      scale: 0.9,
      onComplete: openNext,
    });
  };

  return (
    <Transition
      appear={true}
      in={show}
      timeout={1000}
      onEnter={(node) => gsap.set(node, { opacity: 0 })}
      addEndListener={(node, done) =>
        gsap.to(node, {
          duration: 0.8,
          opacity: show ? 1 : 0,
          onComplete: done,
        })
      }
    >
      <ModalOverlay closeHandler={handleClose}>
        <Transition
          appear={true}
          in={show}
          timeout={1000}
          onEnter={(node) => gsap.set(node, startState)}
          addEndListener={(node, done) =>
            gsap.to(node, {
              duration: 0.3,
              opacity: show ? 1 : 0,
              scale: show ? 1 : 0.9,
              onComplete: done,
            })
          }
        >
          <PhotoWrapper>
            {!isMobile && (
              <ArrowButton
                disabled={index === 0}
                onClick={() => handleChange("left")}
                aria-label="left"
              />
            )}
            <div>
              <FullImage
                src={src}
                alt={`Mars by rover ${rover.name}`}
                onClick={(e) => handleChange(e.clientX)}
                data-testid="full-img"
                ref={fullImg}
              />
              <StyledDescription>
                <h2>{`Mars by rover ${rover.name}`}</h2>
                <p>{`Photo taken on ${earth_date}, ${sol} days from landing.`}</p>
                <p>{`By camera ${camera.full_name}.`}</p>
              </StyledDescription>
            </div>
            {!isMobile && (
              <ArrowButton
                right
                onClick={() => handleChange("right")}
                aria-label="right"
                disabled={index === last}
              />
            )}
          </PhotoWrapper>
        </Transition>
      </ModalOverlay>
    </Transition>
  );
};

export default PhotoModal;

PhotoModal.propTypes = {
  image: PropTypes.shape({
    img_src: PropTypes.string.isRequired,
    sol: PropTypes.number.isRequired,
    earth_date: PropTypes.string.isRequired,
    rover: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    camera: PropTypes.shape({
      full_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  closeHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  isMobile: PropTypes.bool,
  last: PropTypes.number,
};
