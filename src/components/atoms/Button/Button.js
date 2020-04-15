import React from "react";
import styled, { css } from "styled-components";
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
  ${({ icon }) =>
    icon &&
    css`
      background-image: url(${icon});
      background-position: 94% 47%;
      background-repeat: no-repeat;
      padding-right: 3.7rem;
    `}
  ${({ isGrey }) =>
    isGrey &&
    css`
      background-color: rgba(255, 255, 255, 0.6);
      color: #515050;
    `}
`;

const Button = ({
  className,
  children,
  submitHandler,
  isDisabled = false,
  icon,
  isGrey,
  ...props
}) => (
  <StyledButton
    className={className}
    onClick={submitHandler}
    disabled={isDisabled}
    icon={icon}
    isGrey={isGrey}
    {...props}
  >
    {children}
  </StyledButton>
);

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  submitHandler: PropTypes.func,
  isDisabled: PropTypes.bool,
  icon: PropTypes.string,
  isGrey: PropTypes.bool,
};
