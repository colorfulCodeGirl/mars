import React from "react";
import styled from "styled-components";

import RadioGroup from "../../atoms/RadioGroup/RadioGroup";
import Button from "../../atoms/Button/Button";
import Select from "../../atoms/Select/Select";
import Input from "../../atoms/Input/Input";

const StyledForm = styled.form`
  width: 80vw;
  min-height: 75vh;
  max-width: 450px;
  justify-self: center;
  align-self: center;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: 0.1rem solid #515050;
  align-items: center;
  justify-content: space-between;

  @media (min-height: 580px) {
    min-height: 65vh;
    padding: 3rem;
  }
  @media (min-width: 1000px) {
    padding: 5rem;
    max-width: 550px;
    min-height: 55vh;
  }
  @media (orientation: landscape) {
    width: 30vw;
    min-height: 70vh;
  }
`;

const StyledHeading = styled.h1`
  font-weight: 300;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 3rem;
  @media (min-width: 600px) {
    font-size: 2.6rem;
  }
  @media (min-height: 800px) {
    margin-bottom: auto;
  }
`;

const StyledButton = styled(Button)`
  justify-self: flex-end;
  margin-top: 2rem;
  @media (min-width: 400px) {
    margin-top: ${({ marginTop }) => (marginTop ? "auto" : "2rem")};
  }
`;

const SearchFrom = () => (
  <StyledForm>
    <StyledHeading>EXPLORE MARS IMAGES BY ROVERS</StyledHeading>
    <RadioGroup options={["SOL", "Earth day"]} />
    <Input type="text" placeholder="SOL" pattern="[1-100]" />
    <Select options={["rover 1", "rover 2", "rover 3"]} defaultValue="rover" />
    <Select options={["camera 1", "camera 2"]} defaultValue="camera" />
    <StyledButton marginTop>SEARCH</StyledButton>
    <StyledButton>See Latest</StyledButton>
  </StyledForm>
);

export default SearchFrom;
