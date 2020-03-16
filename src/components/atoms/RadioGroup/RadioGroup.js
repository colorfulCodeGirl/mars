import React from "react";
import styled from "styled-components";

const StyledFieldset = styled.div`
  border: none;
  display: flex;
  justify-content: center;
  min-width: 200px;
  position: relative;
  min-height: 3rem;
  @media (min-height: 800px) {
    margin: 1rem 0;
  }
`;

const StyledLegend = styled.legend`
  opacity: 0;
  width: 1px;
  position: absolute;
  left: -100%;
`;

const Wrapper = styled.div`
  margin-right: 3rem;
  position: relative;
`;

const StyledInput = styled.input`
  opacity: 0;
  position: absolute;
  left: -100%;

  + label {
    position: relative;
    cursor: pointer;
    padding-right: 0.5rem;
    text-transform: uppercase;
    color: #515050;

    &::before {
      content: "";
      position: absolute;
      right: -1.4rem;
      top: 0.2rem;
      border-radius: 50%;
      border: 0.1rem solid #515050;
      width: 1.4rem;
      height: 1.4rem;
    }

    &::after {
      content: "";
      position: absolute;
      right: -1rem;
      top: 0.55rem;
      border-radius: 50%;
      width: 0.65rem;
      height: 0.65rem;
    }
  }

  &:checked {
    + label::after {
      background: #515050;
      /* The background is removed in Windows high-contrast mode, so we
       need to set it explicitly here. "WindowText" is a system color
       that should work with whatever high contrast mode the user
       has set. */
      @media screen and (-ms-high-contrast: active) {
        & {
          background: WindowText;
        }
      }
    }
  }

  &:focus {
    + label::before {
      box-shadow: 0 0px 0px 1px #515050, 0 0px 4px #515050;
      /* Since box shadows don't show up in high contrast mode,
         we're adding a transparent outline (which does show up). */
      outline: 2px dotted transparent;
    }
  }
`;

const RadioGroup = ({ options, category, checkedId = 0 }) => (
  <StyledFieldset>
    <StyledLegend>Pick mode</StyledLegend>
    {options.map((option, index) => (
      <Wrapper key={option}>
        <StyledInput
          id={option}
          value={option}
          type="radio"
          name={category}
          checked={checkedId === index}
        />
        <label htmlFor={option}>{option}</label>
      </Wrapper>
    ))}
  </StyledFieldset>
);

export default RadioGroup;
