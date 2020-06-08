import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import arrow from "../../assets/Dropdown.svg";

const StyledSelect = styled.select`
  min-width: 200px;
  width: 100%;
  max-width: 100%;
  min-height: 3rem;
  appearance: none;
  border: none;
  text-transform: uppercase;
  border-bottom: 0.1rem solid #e73d34;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-color: transparent;
  background-position: 97% 40%;
  color: #515050;
  margin: 1rem 0;
  @media (min-width: 375px) {
    min-width: 270px;
  }
  @media (min-height: 800px) {
    min-height: 5rem;
  }
  optgroup {
    background-color: #ffccba;
  }
`;

const Select = ({ options, defaultValue, changeHandler, name, value }) => (
  <>
    <label htmlFor={name} className="sr-only">
      {defaultValue}
    </label>
    <StyledSelect id={name} name={name} value={value} onChange={changeHandler}>
      <option hidden>{defaultValue}</option>
      <optgroup>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </optgroup>
    </StyledSelect>
  </>
);

export default Select;

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};
