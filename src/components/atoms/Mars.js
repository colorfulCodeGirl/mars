import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ReactComponent as Scene } from "../../assets/mars-and-rover.svg";

const Wrapper = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  svg {
    width: 100%;
  }
`;

const Mars = () => {
  const scene = useRef(null);

  useEffect(() => {
    const { current } = scene;
    const stars = current.querySelectorAll(".star");
    const asteroids = current.querySelectorAll(".asteroid");
    const rover = current.querySelector("#rover");
    const planet = current.querySelector("#mars");

    const radius = planet.getBoundingClientRect().width / 2;

    gsap.set([current, ...stars, ...asteroids, rover], { autoAlpha: 0 });
    gsap.set([...stars, ...asteroids], { transformOrigin: "center center" });
    gsap.set(rover, { transformOrigin: `center 310%` });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(current, { duration: 0.7, autoAlpha: 1 })
      .addLabel("appear")
      .fromTo(
        rover,
        { y: "-=300" },
        { duration: 1, y: "+=300", autoAlpha: 1, ease: "bounce.out" },
        "appear"
      )
      .to(stars, { duration: 1, autoAlpha: 1, stagger: 0.1 }, "appear")
      .to(asteroids, { duration: 1, autoAlpha: 1, stagger: 0.1 }, "appear")
      .addLabel("animate")
      .to(
        stars,
        { duration: 0.3, scale: 1.3, repeat: -1, repeatDelay: 0, yoyo: true },
        "animate"
      )
      .to(
        asteroids,
        {
          duration: 1.5,
          rotation: 360,
          repeat: -1,
          repeatDelay: 0,
          ease: "linear",
        },
        "animate"
      )
      .to(
        rover,
        { duration: 7, rotation: -360, ease: "linear", repeat: -1 },
        "animate"
      )
      .to(
        rover,
        { duration: 0.2, scale: 1.02, y: "-=1", repeat: -1 },
        "animate"
      );
  }, []);

  return (
    <Wrapper>
      <Scene ref={scene} />
    </Wrapper>
  );
};

export default Mars;
