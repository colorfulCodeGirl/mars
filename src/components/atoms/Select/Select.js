import React from "react";
import PropTypes from "prop-types";
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

const Select = ({ options, defaultValue, changeHandler, name }) => (
  <>
    <label htmlFor={name} className="sr-only">
      {defaultValue}
    </label>
    <StyledSelect id={name} name={name} onChange={changeHandler}>
      <option hidden>{defaultValue}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  </>
);

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
