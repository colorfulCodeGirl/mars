import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";
import gsap from "gsap";

import SearchForm from "../components/organisms/SearchForm";
import Credentials from "../components/atoms/Credentials";
import ErrorModal from "../components/molecules/ErrorModal";
import { cleanUpForm } from "../store/actionCreators";

const startState = { opacity: 0, y: -150 };

const Home = ({ cleanUpForm, fetchError, show }) => {
  useEffect(() => {
    cleanUpForm();
  }, [cleanUpForm, show]);

  return (
    <Transition
      unmountOnExit
      appear={true}
      in={show}
      timeout={1000}
      onEnter={(node) => gsap.set(node, startState)}
      addEndListener={(node, done) =>
        gsap.to(node, {
          duration: 0.5,
          opacity: 1,
          y: 0,
          onComplete: done,
        })
      }
    >
      <>
        <SearchForm />
        {fetchError && <ErrorModal />}
        <Credentials>
          Image by{" "}
          <a href="https://pixabay.com/users/WikiImages-1897/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=67522">
            WikiImages
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=67522">
            Pixabay
          </a>
        </Credentials>
      </>
    </Transition>
  );
};

const mapStateToProps = ({ fetchError }) => ({
  fetchError,
});

const mapDispatchToProps = {
  cleanUpForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
  cleanUpForm: PropTypes.func.isRequired,
};
