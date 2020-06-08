import React, { useState } from "react";
import styled from "styled-components";
import ModalOverlay from "../atoms/ModalOverlay";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  background-color: #fff;
  padding: 5rem 2rem 2rem 2rem;
  min-width: 80vw;
  @media (min-width: 1000px) {
    padding: 5rem;
    min-width: 50vw;
    max-width: 55vw;
  }
  @media (orientation: landscape) and (min-aspect-ratio: 21/9) {
    min-width: auto;
    width: 30vw;
  }
  p {
    color: #fe6c3d;
  }
`;

const ErrorModal = ({ massage }) => {
  const [isErrorOpen, setIsErrorOpen] = useState(true);
  const modal = isErrorOpen ? (
    <ModalOverlay closeHandler={() => setIsErrorOpen(false)}>
      <Wrapper>
        <p>{massage || "Something went wrong. Please, try again later."}</p>
      </Wrapper>
    </ModalOverlay>
  ) : null;
  return modal;
};

export default ErrorModal;

ErrorModal.propTypes = {
  massage: PropTypes.string,
};
