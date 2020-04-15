import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import close from "../../assets/close.svg";

const StyledOverlay = styled.div`
  z-index: 2;
  width: 100vw;
  height: 100vh;
  background-color: rgba(81, 80, 80, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  @media (min-width: 900px) {
    padding: 3rem;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: min-content;
  margin: 0 auto;
`;

const StyledButton = styled.button`
  background-color: transparent;
  z-index: 999;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  align-self: start;
  justify-self: end;
  width: 3rem;
  height: 3rem;
  border: none;
  padding: 0;
  margin: 1rem;
  img {
    width: 100%;
  }
`;

const ModalOverlay = ({ children, closeHandler }) => (
  <StyledOverlay>
    <Wrapper>
      {children}
      <StyledButton onClick={closeHandler}>
        <img src={close} alt="close" />
      </StyledButton>
    </Wrapper>
  </StyledOverlay>
);

export default ModalOverlay;

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  closeHandler: PropTypes.func.isRequired,
};
