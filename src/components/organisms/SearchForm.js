import React, { useState, useContext } from "react";
import { connect } from "react-redux";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

import RadioGroup from "../atoms/RadioGroup";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import ErrorTooltip from "../atoms/ErrorTooltip";

import { store } from "./store.js";
import * as actionTypes from "../../store/actionTypes";
import * as actions from "../../store/actionCreators";

const StyledForm = styled.form`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
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
  ${({ isTransiting }) =>
    isTransiting &&
    css`
      animation-name: slide-out;
      animation-duration: 2s;
    `}

  @keyframes slide-out {
    50% {
      transform: translateY(200%);
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      transform: translate(-100%, 0);
    }
  }

  ${({ displayLeft }) =>
    displayLeft &&
    css`
      animation-name: slide-in;
      animation-duration: 2s;
      grid-column: auto;
      grid-row: auto;
      justify-self: start;
      align-self: stretch;
      height: 100vh;
      width: 350px;
    `}

  @keyframes slide-in {
    0% {
      transform: translate(-100%, 0);
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

const StyledHeading = styled.h1`
  font-weight: 300;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  color: #515050;
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

const StyledP = styled.p`
  padding: 1.5rem;
  color: #515050;
`;

const SearchFrom = ({
  arePhotosShown,
  handleSearch,
  fetchManifest,
  handlePeriod,
}) => {
  const [isSearchAllowed, allowSearch] = useState(false);
  const [isTransiting, setIsTransiting] = useState(false);
  const [isSol, switchSolDate] = useState(true);

  const rovers = ["Curiosity", "Opportunity", "Spirit"];

  // const changeDateInput = ({ target: { value } }) => {
  //   const type = isSol ? "sol" : "date";
  //   const validationData = isSol ? dates.maxSol : dates;
  //   dispatch({ type, validationData, value, allowSearch });
  // };

  const radioChangeHandler = ({ target: { value } }) => {
    const isSol = value === "sol*" ? true : false;
    switchSolDate(isSol);
  };

  const handleSubmit = (e) => {
    setIsTransiting(true);
    const { latest } = e.target.dataset;
    handleSearch(latest, e, state);
  };

  return (
    <StyledForm
      data-testid="form"
      displayLeft={arePhotosShown}
      isTransiting={isTransiting}
    >
      <StyledHeading>EXPLORE MARS IMAGES BY ROVERS</StyledHeading>
      <Select
        options={rovers}
        name="rovers"
        defaultValue="Choose rover"
        changeHandler={fetchManifest}
      />
      {state.rover && (
        <>
          <RadioGroup
            options={["SOL*", "Earth date"]}
            changeHandler={radioChangeHandler}
            checkedIndex={isSol ? 0 : 1}
          />
          <StyledP>
            <i>* day from landing</i>
          </StyledP>
          <Input
            type="text"
            label={isSol ? "sol" : "Earth days"}
            name={isSol ? "sol" : "Earth days"}
            placeholder={
              isSol
                ? `SOL from 0 to ${dates.maxSol}`
                : `Date from ${dates.startDate} to ${dates.endDate}`
            }
            changeHandler={handleSol}
            value={isSol ? state.sol : state.date}
          />
          <ErrorTooltip
            isError={state.error}
            message={
              isSol
                ? `SOL should be a number from 0 to ${dates.maxSol}`
                : `Date should be from ${dates.startDate} to ${dates.endDate}`
            }
          />
        </>
      )}
      <StyledButton
        marginTop
        isDisabled={!isSearchAllowed}
        type="submit"
        submitHandler={handleSubmit}
      >
        SEARCH
      </StyledButton>
      <StyledButton
        type="submit"
        isDisabled={!state.rover}
        data-latest="true"
        submitHandler={handleSubmit}
      >
        See Latest
      </StyledButton>
    </StyledForm>
  );
};

const mapStateToProps = ({
  rover,
  sol,
  date,
  error,
  startDate,
  endDate,
  maxSol,
}) => ({
  rover,
  sol,
  date,
  error,
  startDate,
  endDate,
  maxSol,
});

const mapDispatchToProps = (dispatch) => ({
  fetchManifest: ({ target: { value } }) =>
    dispatch(actions.fetchManifest(value)),
  handlePeriod: ({ target: { value } }, isSol) =>
    dispatch(actions.validatePeriod(value, isSol)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFrom);

SearchFrom.propTypes = {
  arePhotosShown: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired,
  fetchManifest: PropTypes.func.isRequired,
  handlePeriod: PropTypes.func.isRequired,
};
