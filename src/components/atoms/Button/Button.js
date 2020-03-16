import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
`;

const Button = ({ children, clickHandler, ...props }) => (
  <StyledButton onClick={clickHandler}>{children}</StyledButton>
);

export default Button;
