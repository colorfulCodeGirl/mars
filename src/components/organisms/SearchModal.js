import React, { useState } from "react";
import PropTypes from "prop-types";

import SearchForm from "../organisms/SearchForm";
import Button from "../atoms/Button";
import ModalOverlay from "../atoms/ModalOverlay";

import menuIcon from "../../assets/menu.png";

const SearchModal = ({ searchHandler }) => {
  const [isModalOpen, setModalVisibility] = useState(false);

  return (
    <>
      {!isModalOpen && (
        <Button
          onClick={() => setModalVisibility(true)}
          isGrey={true}
          icon={menuIcon}
        >
          CHANGE SEARCH PARAMS
        </Button>
      )}

      {isModalOpen && (
        <ModalOverlay closeHandler={() => setModalVisibility(false)}>
          <SearchForm handleSearch={searchHandler} />
        </ModalOverlay>
      )}
    </>
  );
};

export default SearchModal;

SearchModal.propTypes = {
  searchHandler: PropTypes.func.isRequired,
};
