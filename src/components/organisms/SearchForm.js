import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import gsap from "gsap";

import StyledForm from "../atoms/StyledForm";
import RadioGroup from "../atoms/RadioGroup";
import Button from "../atoms/Button";
import Select from "../atoms/Select";
import Input from "../atoms/Input";
import ErrorTooltip from "../atoms/ErrorTooltip";
import MarsSmall from "../atoms/MarsSmall";

import * as actions from "../../store/actionCreators";
import styled from "styled-components";

const RestWrapper = styled.section`
  width: 100%;
  display: grid;
  svg {
    max-width: 80%;
  }
`;

const RestForm = styled.div`
  width: 100%;
  grid-area: 1 / -1 / 1 / -1;
  padding-bottom: 3rem;
`;

const SearchFrom = ({
  rover,
  sol,
  date,
  error,
  maxSol,
  startDate,
  endDate,
  solSwitcher,
  displayLeft = false,
  fetchManifest,
  handlePeriod,
  cleanUpPeriod,
  fetchPhotos,
  setSolSwitcher,
  modalCloseHandler,
}) => {
  const [isSearchAllowed, allowSearch] = useState(false);
  const [show, setShow] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showRestFrom, setShowRestForm] = useState(false);
  const history = useHistory();

  const rovers = ["Curiosity", "Opportunity", "Spirit"];

  useEffect(() => {
    if ((sol || date) && error === "") {
      allowSearch(true);
    } else {
      allowSearch(false);
    }
  }, [sol, date, allowSearch, error]);

  useEffect(() => {
    let timeout;
    if (rover) {
      timeout = setTimeout(() => {
        setShowAnimation(false);
        setShowRestForm(true);
      }, 1000);
    }
    return () => clearTimeout(timeout);
  }, [rover]);

  const changeRover = ({ target: { value } }) => {
    setShowAnimation(true);
    fetchManifest(value);
  };

  const radioChangeHandler = ({ target: { value } }) => {
    const newSolSwitch = value === "day from landing" ? "sol" : "date";
    if (solSwitcher !== newSolSwitch) {
      cleanUpPeriod();
    }
    setSolSwitcher(newSolSwitch);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!displayLeft) setShow(false);
    if (modalCloseHandler) modalCloseHandler();
    const { latest } = e.target.dataset;
    fetchPhotos(latest);
    setTimeout(() => {
      history.push(
        `/results?rover=${rover}&latest=${latest}&sol=${sol}&date=${date}`
      );
    }, 500);
  };

  return (
    <Transition
      appear={true}
      in={show}
      timeout={1000}
      onExit={(node) => gsap.to(node, { duration: 0.5, opacity: 0, y: 50 })}
    >
      <StyledForm
        data-testid="form"
        displayLeft={displayLeft}
        onSubmit={submitHandler}
      >
        <h1>EXPLORE MARS IMAGES BY ROVERS</h1>
        <Select
          options={rovers}
          name="rovers"
          value={rover}
          defaultValue="Choose rover"
          changeHandler={changeRover}
        />
        <RestWrapper>
          <Transition
            unmountOnExit
            timeout={3000}
            in={showAnimation && !displayLeft}
            onEnter={(node) => gsap.set(node, { autoAlpha: 0 })}
            addEndListener={(node, done) => {
              gsap.to(node, {
                duration: 0.3,
                autoAlpha: !rover ? 1 : 0,
                onComplete: done,
              });
            }}
          >
            <MarsSmall />
          </Transition>
          <Transition
            unmountOnExit
            timeout={3000}
            in={(showRestFrom) || displayLeft}
            appear={true}
            onEnter={(node) => {
              gsap.set(node, { autoAlpha: 0 });
            }}
            addEndListener={(node, done) => {
              gsap.to(node, {
                duration: 1,
                autoAlpha: !showAnimation ? 1 : 0,
                onComplete: done,
              });
            }}
          >
            <RestForm>
              <RadioGroup
                options={["Day from landing", "Earth date"]}
                changeHandler={radioChangeHandler}
                checkedIndex={solSwitcher === "sol" ? 0 : 1}
              />
              <Input
                type="text"
                name={solSwitcher === "sol" ? "sol" : "Earth days"}
                placeholder={
                  solSwitcher === "sol"
                    ? `Day from landing from 0 to ${maxSol}`
                    : `Date from ${startDate} to ${endDate}`
                }
                changeHandler={({ target: { value } }) =>
                  handlePeriod(value, solSwitcher)
                }
                value={solSwitcher === "sol" ? sol : date}
              />
              <ErrorTooltip message={error} />
            </RestForm>
          </Transition>
        </RestWrapper>
        <Button
          marginTop
          isDisabled={!isSearchAllowed}
          type="submit"
          clickHandler={submitHandler}
          isFormBtn
        >
          SEARCH BY DAY
        </Button>
        <Button
          type="submit"
          isDisabled={!rover}
          data-latest="true"
          clickHandler={submitHandler}
          isFormBtn
        >
          See Latest
        </Button>
      </StyledForm>
    </Transition>
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
  solSwitcher,
}) => ({
  rover,
  sol,
  date,
  error,
  maxSol,
  startDate,
  endDate,
  solSwitcher,
});

const mapDispatchToProps = (dispatch) => ({
  fetchManifest: (value) => {
    dispatch(actions.setAllowDataFromUrl(false));
    dispatch(actions.fetchManifest(value));
  },
  handlePeriod: (value, solSwitcher) => {
    dispatch(actions.validatePeriod(value, solSwitcher));
  },
  cleanUpPeriod: () => dispatch(actions.cleanUpPeriod()),
  fetchPhotos: (latest) => dispatch(actions.fetchPhotos(latest)),
  setSolSwitcher: (value) => dispatch(actions.setSolSwitcher(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFrom);

SearchFrom.propTypes = {
  rover: PropTypes.string,
  sol: PropTypes.string,
  date: PropTypes.string,
  error: PropTypes.string,
  maxSol: PropTypes.number,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  displayLeft: PropTypes.bool,
  fetchManifest: PropTypes.func.isRequired,
  handlePeriod: PropTypes.func.isRequired,
  cleanUpPeriod: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  solSwitcher: PropTypes.string.isRequired,
  setSolSwitcher: PropTypes.func.isRequired,
  modalCloseHandler: PropTypes.func,
};
