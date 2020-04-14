import React, { useState, useEffect } from "react";
import "./App.css";
import styled, { createGlobalStyle, css } from "styled-components";
import hash from "object-hash";

import SearchForm from "./components/organisms/SearchForm";
import Gallery from "./components/organisms/Gallery";
import Button from "./components/atoms/Button/Button";
import ModalOverlay from "./components/atoms/ModalOverlay";
import AnimatedMars from "./components/atoms/AnimatedMars/AnimatedMars";

import { fetchData } from "./helpers";

import menuIcon from "./assets/menu.png";
import background from "./assets/background.png";

export const GlobalStyles = createGlobalStyle`
@import url("https://fonts.googleapis.com/css?family=Montserrat:200,400&display=swap");

:root {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
  font-size: 62.5%;
}

*,
*::after,
*::before {
  box-sizing: inherit;
  font-family: inherit;
  margin: 0;
  font-size: 1.6rem;
}

.sr-only {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}
`;

const AppWrapper = styled.div`
  background-image: url(${background});
  background-position-x: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  display: grid;
  ${({ arePhotosShown }) =>
    arePhotosShown &&
    css`
      button {
        margin: 1rem;
      }
    `}

  @media (min-width: 780px) {
    ${({ arePhotosShown }) =>
      arePhotosShown &&
      css`
        grid-template-columns: auto 3fr;
      `}
  }
`;

const Credentials = styled.p`
  color: #ffffff;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0.5rem;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

function App() {
  const [arePhotosShown, setPhotosStatus] = useState(false);
  const [photosObj, setPhotos] = useState({ photos: [], hash: "" });
  const [isModalSearchShown, setModalSearchVisibility] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const checkIfItIsMobile = () => window.innerWidth < 780;
  const isFormShown = !arePhotosShown || (arePhotosShown && !isMobile);

  useEffect(() => {
    setIsMobile(checkIfItIsMobile());

    // timeoutId for debounce mechanism
    let timeoutId = null;

    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMobile(checkIfItIsMobile()), 150);
    };

    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const fetchPhotos = async (newest = null, e, state) => {
    e.preventDefault();
    const { rover, sol, date } = state;
    const urlParams = newest
      ? `rovers/${rover}/latest_photos?`
      : sol
      ? `rovers/${rover}/photos?sol=${sol}`
      : `rovers/${rover}/photos?earth_date=${date}`;
    const response = await fetchData(urlParams);
    const newPhotos = response.latest_photos || response.photos;
    if (isMobile) {
      setModalSearchVisibility(false);
    }
    setPhotos({ photos: newPhotos, hash: hash(newPhotos) });
    setPhotosStatus(true);
  };

  return (
    <>
      <GlobalStyles />
      <AppWrapper arePhotosShown={arePhotosShown}>
        {isFormShown && (
          <SearchForm
            arePhotosShown={arePhotosShown}
            handleSearch={fetchPhotos}
          />
        )}
        {!isFormShown && (
          <Button
            onClick={() => setModalSearchVisibility(true)}
            isGrey={true}
            icon={menuIcon}
          >
            CHANGE SEARCH PARAMS
          </Button>
        )}
        {isModalSearchShown && (
          <ModalOverlay closeHandler={() => setModalSearchVisibility(false)}>
            <SearchForm
              isTransparent={false}
              arePhotosShown={false}
              handleSearch={fetchPhotos}
            />
          </ModalOverlay>
        )}
        {arePhotosShown && (
          <Gallery photosObj={photosObj} isMobile={isMobile} />
        )}
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
      </AppWrapper>
    </>
  );
}

export default App;
