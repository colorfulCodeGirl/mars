import React from "react";
import "./App.css";
import styled, { createGlobalStyle } from "styled-components";
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
`;

const AppWrapper = styled.div`
  background-image: url(${background});
  height: 100vh;
  position: relative;
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
