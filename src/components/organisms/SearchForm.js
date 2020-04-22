import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import StyledForm from "../atoms/StyledForm";
import RadioGroup from "../atoms/RadioGroup";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import ErrorTooltip from "../atoms/ErrorTooltip";

import * as actions from "../../store/actionCreators";

const SearchFrom = ({
  rover,
  sol,
  date,
  error,
  maxSol,
  startDate,
  endDate,
  arePhotosShown = false,
  fetchManifest,
  handlePeriod,
  cleanUpPeriod,
}) => {
  const [isSearchAllowed, allowSearch] = useState(false);
  const [isTransiting, setIsTransiting] = useState(false);
  const [isSol, switchSolDate] = useState(true);

  const rovers = ["Curiosity", "Opportunity", "Spirit"];

  useEffect(() => {
    if ((sol || date) && error === "") {
      allowSearch(true);
    } else {
      allowSearch(false);
    }
  }, [sol, date, allowSearch, error]);

  const radioChangeHandler = ({ target: { value } }) => {
    const isSolNew = value === "sol*" ? true : false;
    if (isSol !== isSolNew) {
      cleanUpPeriod();
    }
    switchSolDate(isSolNew);
  };

  // const handleSubmit = (e) => {
  //   setIsTransiting(true);
  //   const { latest } = e.target.dataset;
  // };

  return (
    <StyledForm
      data-testid="form"
      displayLeft={arePhotosShown}
      isTransiting={isTransiting}
      onSubmit={() => {}}
    >
      <h1>EXPLORE MARS IMAGES BY ROVERS</h1>
      <Select
        options={rovers}
        name="rovers"
        defaultValue="Choose rover"
        changeHandler={fetchManifest}
      />
      {rover && (
        <>
          <RadioGroup
            options={["SOL*", "Earth date"]}
            changeHandler={radioChangeHandler}
            checkedIndex={isSol ? 0 : 1}
          />
          <p>
            <i>* day from landing</i>
          </p>
          <Input
            type="text"
            label={isSol ? "sol" : "Earth days"}
            name={isSol ? "sol" : "Earth days"}
            placeholder={
              isSol
                ? `SOL from 0 to ${maxSol}`
                : `Date from ${startDate} to ${endDate}`
            }
            changeHandler={({ target: { value } }) =>
              handlePeriod(value, isSol)
            }
            value={isSol ? sol : date}
          />
          <ErrorTooltip message={error} />
        </>
      )}
      <Button
        marginTop
        isDisabled={!isSearchAllowed}
        type="submit"
        submitHandler={() => {}}
        isFormBtn
      >
        SEARCH
      </Button>
      <Button
        type="submit"
        isDisabled={!rover}
        data-latest="true"
        submitHandler={() => {}}
        isFormBtn
      >
        See Latest
      </Button>
    </StyledForm>
  );
};

const mapStateToProps = ({
  rover,
  sol,
  date,
  error,
  maxSol,
  startDate,
  endDate,
}) => ({
  rover,
  sol,
  date,
  error,
  maxSol,
  startDate,
  endDate,
});

const mapDispatchToProps = (dispatch) => ({
  fetchManifest: ({ target: { value } }) =>
    dispatch(actions.fetchManifest(value)),
  handlePeriod: (value, isSol) => {
    dispatch(actions.validatePeriod(value, isSol));
  },
  cleanUpPeriod: () => dispatch(actions.cleanUpPeriod()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFrom);

SearchFrom.propTypes = {
  rover: PropTypes.string,
  sol: PropTypes.string,
  date: PropTypes.string,
  error: PropTypes.string,
  maxSol: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  arePhotosShown: PropTypes.bool,
  fetchManifest: PropTypes.func.isRequired,
  handlePeriod: PropTypes.func.isRequired,
  cleanUpPeriod: PropTypes.func,
};
