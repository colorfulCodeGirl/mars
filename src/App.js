import React, { useState } from "react";
import "./App.css";
import styled, { createGlobalStyle, css } from "styled-components";
import background from "./assets/background.png";
import SearchForm from "./components/organisms/SearchForm";
import Gallery from "./components/organisms/Gallery";
import Button from "./components/atoms/Button/Button";
import { fetchData } from "./helpers";
import menuIcon from "./assets/menu.png";

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
      align-content: start;
      justify-items: end;
      button {
        margin: 1rem;
      }
    `}

  @media (min-width: 600px) {
    ${({ arePhotosShown }) =>
      arePhotosShown &&
      css`
        grid-template-columns: 1fr 3fr;
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
  const [photos, setPhotos] = useState([]);

  const isMobile = window.innerWidth < 600;
  const isFormShown = !arePhotosShown || (arePhotosShown && !isMobile);

  const fetchPhotos = async (newest = null, e, state) => {
    e.preventDefault();
    setPhotosStatus(true);
    const { rover, sol, date } = state;
    const urlParams = newest
      ? `rovers/${rover}/latest_photos?`
      : sol
      ? `rovers/${rover}/photos?sol=${sol}`
      : `rovers/${rover}/photos?earth_date=${date}`;
    const response = await fetchData(urlParams);
    const newPhotos = response.latest_photos || response.photos;
    console.log(newPhotos);
    setPhotos(newPhotos);
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
          <Button onClick={() => {}} isGrey={true} icon={menuIcon}>
            CHANGE SEARCH PARAMS
          </Button>
        )}
        <Gallery photos={photos} />
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
