import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  border: none;
  padding: 0.9rem 2.7rem;
  background-color: #fe6c3d;
  color: #ffffff;
  border-radius: 0.4rem;
  text-transform: uppercase;
  &:disabled {
    background-color: #515050;
  }
`;

const Button = ({ children, submitHandler, isDisabled = false, ...props }) => (
  <StyledButton onClick={submitHandler} disabled={isDisabled} {...props}>
    {children}
  </StyledButton>
);

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  submitHandler: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool
};
