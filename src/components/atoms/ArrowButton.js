import React from "react";
import styled from "styled-components";

import { ReactComponent as Arrow } from "../../assets/arrow.svg";

const StyledButton = styled.button`
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

const ArrowButton = (props) => (
  <StyledButton {...props}>
    <Arrow />
  </StyledButton>
);

export default ArrowButton;
