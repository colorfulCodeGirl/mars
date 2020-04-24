import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import SearchForm from "../components/organisms/SearchForm";
import Credentials from "../components/atoms/Credentials";
import { cleanUpForm } from "../store/actionCreators";

const Home = ({ cleanUpForm }) => {
  useEffect(() => {
    cleanUpForm();
  }, [cleanUpForm]);
  return (
    <>
      <SearchForm />
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

const mapDispatchToProps = {
  cleanUpForm,
};

export default connect(null, mapDispatchToProps)(Home);

Home.propTypes = {
  cleanUpForm: PropTypes.func.isRequired,
};
