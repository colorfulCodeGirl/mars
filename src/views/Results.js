import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import SearchForm from "../components/organisms/SearchForm";
import SearchModal from "../components/molecules/SearchModal";
import Gallery from "../components/organisms/Gallery";

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

const Results = ({ rover, setFromUrl, allowDataFromURL }) => {
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
    <Wrapper data-testid="results">
      {isMobile ? <SearchModal /> : <SearchForm displayLeft />}
      <Gallery isMobile={isMobile} />
    </Wrapper>
  );
};

const mapStateToProps = ({ rover, allowDataFromURL }) => ({
  rover,
  allowDataFromURL,
});

const mapDispatchToProps = {
  setFromUrl,
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
