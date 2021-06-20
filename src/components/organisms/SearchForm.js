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
import { useGetManifest } from "../../hooks/network/useGetManifest";

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
  sol,
  date,
  error,
  allowDataFromUrl,
  solSwitcher,
  displayLeft = false,
  handlePeriod,
  cleanUpPeriod,
  fetchPhotos,
  setSolSwitcher,
  modalCloseHandler,
}) => {
  const [isSearchAllowed, allowSearch] = useState(false);
  const [show, setShow] = useState(true);
  const history = useHistory();
  const rovers = ["Curiosity", "Opportunity", "Spirit"];
  const {
    rover,
    setRover,
    maxSol,
    startDate,
    endDate,
    isLoading,
    manifestFetched,
  } = useGetManifest();

  useEffect(() => {
    if ((sol || date) && error === "") {
      allowSearch(true);
    } else {
      allowSearch(false);
    }
  }, [sol, date, allowSearch, error]);

  const changeRover = ({ target: { value } }) => {
    setRover(value);
    allowDataFromUrl();
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
            in={isLoading}
            onEnter={(node) => gsap.set(node, { autoAlpha: 0 })}
            addEndListener={(node, done) => {
              gsap.to(node, {
                duration: 0.3,
                delay: manifestFetched ? 1 : 0,
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
            in={manifestFetched}
            appear={true}
            onEnter={(node) => {
              gsap.set(node, { autoAlpha: 0 });
            }}
            addEndListener={(node, done) => {
              gsap.to(node, {
                duration: manifestFetched ? 1 : 0,
                delay: manifestFetched ? 1 : 0,
                autoAlpha: manifestFetched ? 1 : 0,
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

const mapStateToProps = ({ rover, sol, date, error, solSwitcher }) => ({
  rover,
  sol,
  date,
  error,
  solSwitcher,
});

const mapDispatchToProps = (dispatch) => ({
  allowDataFromUrl: () => {
    dispatch(actions.setAllowDataFromUrl(false));
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
  sol: PropTypes.string,
  date: PropTypes.string,
  error: PropTypes.string,
  allowDataFromUrl: PropTypes.func,
  displayLeft: PropTypes.bool,
  handlePeriod: PropTypes.func.isRequired,
  cleanUpPeriod: PropTypes.func.isRequired,
  fetchPhotos: PropTypes.func.isRequired,
  solSwitcher: PropTypes.string.isRequired,
  setSolSwitcher: PropTypes.func.isRequired,
  modalCloseHandler: PropTypes.func,
};
