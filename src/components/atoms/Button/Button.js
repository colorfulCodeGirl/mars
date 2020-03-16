import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  padding: 0.9rem 2.7rem;
  background-color: #fe6c3d;
  color: #ffffff;
  border-radius: 0.4rem;
  &:disabled {
    background-color: #515050;
  }
`;

const Button = ({ children, clickHandler, ...props }) => (
  <StyledButton onClick={clickHandler} {...props}>
    {children}
  </StyledButton>
);

export default Button;
