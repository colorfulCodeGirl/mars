import React from "react";
import styled from "styled-components";
import arrow from "../../../assets/Dropdown.svg";

const StyledSelect = styled.select`
  border: none;
  border-bottom: 0.1rem solid #fe6c3d;
  min-width: 200px;
  width: 100%;
  max-width: 100%;
  appearance: none;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 97% 40%;
  min-height: 3rem;
  margin: 1rem 0;
  color: #515050;
  text-transform: uppercase;
  @media (min-width: 375px) {
    min-width: 270px;
  }
  @media (min-height: 800px) {
    min-height: 5rem;
  }
  optgroup {
    border: none;
  }
`;

const Select = ({ options, defaultValue }) => (
  <StyledSelect>
    <option hidden>{defaultValue}</option>
    {options.map(option => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </StyledSelect>
);

export default Select;
