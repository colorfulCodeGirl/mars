import React, { useState, useReducer } from "react";
import styled from "styled-components";

import RadioGroup from "../../atoms/RadioGroup/RadioGroup";
import Button from "../../atoms/Button/Button";
import Select from "../../atoms/Select/Select";
import Input from "../../atoms/Input/Input";

const StyledForm = styled.form`
  width: 80vw;
  min-height: 75vh;
  max-width: 450px;
  justify-self: center;
  align-self: center;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 0.1rem solid #515050;
  align-items: center;
  justify-content: space-between;

  @media (min-height: 580px) {
    min-height: 65vh;
    padding: 3rem;
  }
  @media (min-width: 1000px) {
    padding: 5rem;
    max-width: 550px;
    min-height: 55vh;
  }
  @media (orientation: landscape) and (min-aspect-ratio: 21/9) {
    width: 30vw;
    min-height: 70vh;
  }
`;

const StyledHeading = styled.h1`
  font-weight: 300;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  @media (min-width: 600px) {
    font-size: 2.6rem;
  }
  @media (min-height: 800px) {
    margin-bottom: auto;
  }
`;

const StyledButton = styled(Button)`
  justify-self: flex-end;
  margin-top: 2rem;
  @media (min-width: 375px) {
    margin-top: ${({ marginTop }) => (marginTop ? "auto" : "2rem")};
  }
`;

const initialState = {
  rover: "",
  sol: "",
  solError: false,
  day: "",
  dayError: false
};

const reducer = (state, action) => {
  const { type, value } = action;
  switch (type) {
    case "rover":
      action.setSolDates(value);
      return {
        ...state,
        rover: value
      };
    case "sol":
      const error = +value >= 0 && +value <= +action.maxSol ? false : true;
      console.log(error);
      return {
        ...state,
        sol: value,
        solError: error
      };
    case "day":
      return {
        ...state,
        day: value
      };
    default:
      return state;
  }
};

const SearchFrom = () => {
  const rovers = ["Curiosity", "Opportunity", "Spirit"];
  const [maxSol, setMaxSol] = useState("max");
  const [dates, setDates] = useState({
    startDate: "",
    endDate: ""
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  const setSolDates = async rover => {
    const apiKey = process.env.REACT_APP_API_CODE;
    const response = await fetch(
      `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`
    );
    const data = await response.json();
    const { photo_manifest: roverData } = data;
    const {
      max_sol: maxSol,
      landing_date: startDate,
      max_date: endDate
    } = roverData;
    console.log(maxSol, startDate, endDate);
    setMaxSol(maxSol);
    setDates({ startDate, endDate });
  };

  return (
    <StyledForm>
      <StyledHeading>EXPLORE MARS IMAGES BY ROVERS</StyledHeading>
      <Select
        options={rovers}
        defaultValue="Choose rover"
        changeHandler={({ target: { value } }) =>
          dispatch({ type: "rover", setSolDates, value })
        }
      />
      <RadioGroup options={["SOL", "Earth day"]} />
      <Input
        type="text"
        placeholder={`SOL from 0 to ${maxSol}`}
        changeHandler={e => dispatch({ type: "sol", maxSol, e })}
      />
      <StyledButton marginTop>SEARCH</StyledButton>
      <StyledButton>See Latest</StyledButton>
    </StyledForm>
  );
};

export default SearchFrom;
