import React, { useEffect, useState } from "react";
import styled from "styled-components";

import SearchForm from "../components/organisms/SearchForm";
import SearchModal from "../components/organisms/SearchModal";
import Gallery from "../components/organisms/Gallery";

const Wrapper = styled.main`
  display: grid;
  @media (min-width: 780px) {
    grid-template-columns: auto 3fr;
  }
`;

const Results = () => {
  const [isMobile, setIsMobile] = useState(false);

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
    <Wrapper>
      {isMobile ? <SearchModal /> : <SearchForm displayLeft />}
      <Gallery isMobile={isMobile} />
    </Wrapper>
  );
};

export default Results;
