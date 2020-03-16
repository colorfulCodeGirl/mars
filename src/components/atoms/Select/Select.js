import styled from "styled-components";
import arrow from "../../../assets/Dropdown.svg";

const Select = styled.select`
  border: none;
  border-bottom: 0.1rem solid #fe6c3d;
  padding-bottom: 1.2rem;
  min-width: 270px;
  appearance: none;
  background-image: url(${arrow});
  background-repeat: no-repeat;
  background-position: 97% 40%;

  optgroup {
    border: none;
  }

  &::placeholder,
  option {
    color: #515050;
    text-transform: uppercase;
  }
`;

export default Select;
