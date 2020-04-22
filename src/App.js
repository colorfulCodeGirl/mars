import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Results from "./views/Results";

// import hash from "object-hash";
// import { fetchData } from "./helpers";

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

.lazy-load-image-background {
  width: 100%;
}
`;

const AppWrapper = styled.div`
  background-image: url(${background});
  background-position-x: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
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
            <Route path="/">
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

  // const [arePhotosShown, setPhotosStatus] = useState(false);
  // const [isMarsAnimating, setIsMarsAnimating] = useState(false);
  // const [isLoaderShown, setLoaderVisibility] = useState(false);
  // const [photosObj, setPhotos] = useState({ photos: [], hash: "" });

  // const fetchPhotos = async (newest = null, e, state) => {
  //   e.preventDefault();
  //   setPhotosStatus(true);
  //   setLoaderVisibility(true);
  //   setIsMarsAnimating(true);
  //   const { rover, sol, date } = state;
  //   const urlParams = newest
  //     ? `rovers/${rover}/latest_photos?`
  //     : sol
  //     ? `rovers/${rover}/photos?sol=${sol}`
  //     : `rovers/${rover}/photos?earth_date=${date}`;
  //   const response = await fetchData(urlParams);
  //   const newPhotos = response.latest_photos || response.photos;
  //   if (isMobile) {
  //     setModalSearchVisibility(false);
  //   }
  //   setPhotos({ photos: newPhotos, hash: hash(newPhotos) });
  //   setTimeout(() => setIsMarsAnimating(false), 500);
  // };

  // const onMarsAnimationEnd = () => {
  //   setLoaderVisibility(false);
  // };

  // return (
  //   <>
  //
  //     <AppWrapper arePhotosShown={arePhotosShown}>
  //       {isFormShown && (
  //         <SearchForm
  //           arePhotosShown={arePhotosShown}
  //           handleSearch={fetchPhotos}
  //         />
  //       )}

  //       {arePhotosShown && (
  //
  //       )}

  //     </AppWrapper>
  //   </>
  // );
}

export default App;
