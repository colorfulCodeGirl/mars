import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import close from "../../assets/close.svg";

const StyledOverlay = styled.div`
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(81, 80, 80, 0.5);
  padding: 3rem;
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledButton = styled.button`
  background-color: transparent;
  max-width: 3rem;
  max-height: 3rem;
  border: none;
  padding: 0;
  position: absolute;
  top: 3rem;
  right: 3rem;
  margin: 1rem;
  img {
    width: 100%;
  }
`;

const ModalOverlay = ({ children, closeHandler }) => (
  <StyledOverlay>
    <StyledButton onClick={closeHandler}>
      <img src={close} alt="close icon" />
    </StyledButton>
    {children}
  </StyledOverlay>
);

export default ModalOverlay;

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired
};
