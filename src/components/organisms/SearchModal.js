import React, { useState } from "react";

import SearchForm from "../organisms/SearchForm";
import Button from "../atoms/Button";
import ModalOverlay from "../atoms/ModalOverlay";

import menuIcon from "../../assets/menu.png";

const SearchModal = () => {
  const [isModalOpen, setModalVisibility] = useState(false);

  return (
    <>
      {!isModalOpen && (
        <Button
          clickHandler={() => setModalVisibility(true)}
          isGrey={true}
          icon={menuIcon}
        >
          CHANGE SEARCH PARAMS
        </Button>
      )}

      {isModalOpen && (
        <ModalOverlay closeHandler={() => setModalVisibility(false)}>
          <SearchForm />
        </ModalOverlay>
      )}
    </>
  );
};

export default SearchModal;
