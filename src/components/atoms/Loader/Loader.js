import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
  transform: translateZ(1px);
  div {
    width: 3rem;
    height: 3rem;
    margin: 8px auto;
    border-radius: 50%;
    background: radial-gradient(circle at 10px 10px, #fe6c3d, #000);
    animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  @keyframes lds-circle {
    0%,
    100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
`;

const Loader = () => (
  <StyledLoader>
    <div></div>
  </StyledLoader>
);

export default Loader;
