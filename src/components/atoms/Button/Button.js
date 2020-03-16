import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  padding: 0.9rem 2.7rem;
  background-color: #fe6c3d;
`;

const Button = ({ children, clickHandler, ...props }) => (
  <StyledButton onClick={clickHandler}>{children}</StyledButton>
);

export default Button;
