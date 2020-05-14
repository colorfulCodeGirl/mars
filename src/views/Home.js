import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SearchForm from "../components/organisms/SearchForm";
import Credentials from "../components/atoms/Credentials";
import ErrorModal from "../components/molecules/ErrorModal";
import { cleanUpForm } from "../store/actionCreators";

const Home = ({ cleanUpForm, fetchError }) => {
  useEffect(() => {
    cleanUpForm();
  }, [cleanUpForm]);
  return (
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
