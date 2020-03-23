import React from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
import background from "./assets/background.png";
import SearchForm from "./components/organisms/SearchForm/SearchForm";

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
  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <SearchForm arePhotosShown={true} />
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
