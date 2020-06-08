import styled, { css } from "styled-components";

const StyledForm = styled.form`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  width: 90vw;
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

  h1 {
    font-weight: 300;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 3rem;
    color: #515050;
    @media (min-width: 600px) {
      font-size: 2.6rem;
    }
    @media (min-height: 800px) {
      margin-bottom: auto;
    }
  }
  p {
    padding: 1.5rem;
    color: #515050;
  }

  @media (min-height: 580px) {
    min-height: 65vh;
    padding: 3rem;
  }
  @media (min-width: 1000px) {
    padding: 5rem;
    max-width: 550px;
    min-height: 55vh;
  }
  @media (orientation: landscape) and (min-aspect-ratio: 21/9) {
    width: 30vw;
    min-height: 70vh;
  }

  ${({ displayLeft }) =>
    displayLeft &&
    css`
      animation-name: slide-in;
      animation-duration: 2s;
      grid-column: auto;
      grid-row: auto;
      justify-self: start;
      align-self: stretch;
      height: 100vh;
      width: 350px;
    `}
`;

export default StyledForm;
