import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";
import { ReactComponent as Mars } from "../../../assets/mars.svg";

const StyledContainer = styled.div`
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const StyledMars = styled(Mars)`
  width: 10rem;
  height: 10rem;
`;

const Shadow = styled.div`
  width: 10rem;
  height: 2rem;
  background: radial-gradient(rgba(0, 0, 0, 0.5), transparent 60%);
`;

const AnimatedMars = ({ isAnimating }) => {
  const mars = useRef(null);
  const shadow = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    const { current: planet } = mars;
    const { current: shdw } = shadow;

    tl.addLabel("start")
      .to(
        planet,
        {
          y: -160,
          duration: 1.5,
          ease: "bounce.in",
        },
        "start"
      )
      .addLabel("half")
      .to(
        planet,
        {
          y: 0,
          duration: 1.5,
          ease: "bounce.out",
        },
        "half"
      );

    tl.to(
      shdw,
      {
        scale: 1.5,
        duration: 1.5,
        ease: "bounce.in",
      },
      "start"
    ).to(
      shdw,
      {
        scale: 1,
        duration: 1.5,
        ease: "bounce.in",
      },
      "half"
    );
  }, [isAnimating]);

  return (
    <StyledContainer>
      <StyledMars ref={mars} />
      <Shadow ref={shadow} />
    </StyledContainer>
  );
};

export default AnimatedMars;
