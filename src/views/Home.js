import React from "react";

import SearchForm from "../components/organisms/SearchForm";
import Credentials from "../components/atoms/Credentials";

const Home = () => (
  <>
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
  </>
);

export default Home;
