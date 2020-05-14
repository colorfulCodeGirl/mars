import styled from "styled-components";

const FullImage = styled.img`
  max-width: 85vw;
  max-height: 80vh;
  margin: 1.5rem;
  margin-top: 4.5rem;
  @media (min-width: 900px) {
    margin: 2rem;
  }
  @media (orientation: landscape) {
    max-width: 80vw;
  }
`;

export default FullImage;
