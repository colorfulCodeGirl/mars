import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Transition } from "react-transition-group";
import gsap from "gsap";

import SearchForm from "../components/organisms/SearchForm";
import SearchModal from "../components/molecules/SearchModal";
import Gallery from "../components/organisms/Gallery";
import ErrorModal from "../components/molecules/ErrorModal";

import { setFromUrl } from "../store/actionCreators";

const Wrapper = styled.div`
  display: grid;
  @media (min-width: 780px) {
    grid-template-columns: auto 3fr;
  }
  button:first-child {
    justify-self: end;
    align-self: center;
  }
`;

const startState = { opacity: 0, x: -150 };

const Results = ({ rover, setFromUrl, allowDataFromURL, fetchError, show }) => {
  const [isMobile, setIsMobile] = useState(false);
  const query = useLocation().search;

  useEffect(() => {
    if (!rover && allowDataFromURL) {
      const params = new URLSearchParams(query);
      setFromUrl(params);
    }
  }, [query, rover, setFromUrl, allowDataFromURL]);

  useEffect(() => {
    const mobile = window.innerWidth < 780;
    setIsMobile(mobile);
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(window.innerWidth < 780), 150);
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

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
          opacity: show ? 1 : 0,
          x: show ? 0 : 150,
          onComplete: done,
        })
      }
    >
      <Wrapper data-testid="results">
        {isMobile ? <SearchModal /> : <SearchForm displayLeft />}
        <Gallery isMobile={isMobile} />
        {fetchError && <ErrorModal />}
      </Wrapper>
    </Transition>
  );
};

const mapStateToProps = ({ rover, allowDataFromURL, fetchError }) => ({
  rover,
  allowDataFromURL,
  fetchError,
});

const mapDispatchToProps = {
  setFromUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
