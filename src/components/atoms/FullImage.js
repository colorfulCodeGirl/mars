import styled from "styled-components";

const FullImage = styled.img`
  max-width: 85vw;
  max-height: 80vh;
  margin: 1.5rem;
  margin-top: 4.5rem;
  @media (min-width: 900px) and (orientation: landscape) {
    margin: 2rem;
  }
  @media (orientation: landscape) {
    max-width: 80vw;
  }
  @media (orientation: landscape) and (max-width: 1000px) {
    max-height: 60vh;
  }
  @media (orientation: landscape) and (min-width: 1000px) and (max-width: 1300px) {
    max-height: 75vh;
  }
`;

export default FullImage;
