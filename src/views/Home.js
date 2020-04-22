import React from "react";
import styled from "styled-components";

import SearchForm from "../components/organisms/SearchForm";

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

const Home = (props) => (
  <main>
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
  </main>
);

export default Home;
