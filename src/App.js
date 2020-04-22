import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Results from "./views/Results";

import background from "./assets/background.png";

//export needed for storybook
export const GlobalStyles = createGlobalStyle`
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

/* for library react-lazy-load-image-component */
.lazy-load-image-background {
  width: 100%;
}
`;

const AppWrapper = styled.main`
  background-image: url(${background});
  background-position-x: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
  display: grid;
`;

function App() {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <Router>
        <GlobalStyles />
        <AppWrapper>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
          </Switch>
        </AppWrapper>
      </Router>
    </>
  );
}

export default App;
