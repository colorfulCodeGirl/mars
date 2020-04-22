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
  ${({ isFormBtn }) =>
    isFormBtn &&
    css`
      justify-self: flex-end;
      margin-top: 2rem;
      @media (min-width: 375px) {
        margin-top: ${({ marginTop }) => (marginTop ? "auto" : "2rem")};
      }
    `}
`;

const Button = ({
  children,
  submitHandler,
  isDisabled = false,
  icon,
  isGrey,
  isFormBtn,
  ...props
}) => (
  <StyledButton
    onClick={submitHandler}
    disabled={isDisabled}
    icon={icon}
    isGrey={isGrey}
    isFormBtn={isFormBtn}
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
  isFormBtn: PropTypes.bool,
};
