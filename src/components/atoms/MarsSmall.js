/*eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/
/*eslint function-call-argument-newline: ["error", "never"]*/
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ReactComponent as Scene } from "../../assets/mars-and-rover-mobile.svg";

const Wrapper = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  justify-content: center;
  svg {
  align-self: flex-end;
    width: 100%;
  }
`;

const MarsSmall = () => {
  const scene = useRef(null);

  useEffect(() => {
    const { current } = scene;
    const stars = current.querySelectorAll(".star");
    const asteroids = current.querySelectorAll(".asteroid");
    const rover = current.querySelector("#rover");
    const auras = current.querySelectorAll(".aura");
    const head = current.querySelector("#head");
    const flash = current.querySelector("#flash");
    const mars = current.querySelector("#mars");
    const skyObjects = current.querySelector("#sky-objects");

    gsap.set([current, ...stars, ...asteroids, rover], { autoAlpha: 0 });
    gsap.set([...stars, ...asteroids, ...auras, flash, mars, skyObjects], {
      transformOrigin: "center center",
    });
    gsap.set(head, { transformOrigin: "100% center" });
    gsap.set(flash, { scale: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(current, { duration: 0.7, autoAlpha: 1 })
      .addLabel("appear")
      .to(rover, { duration: 0.5, autoAlpha: 1 }, "appear")
      .fromTo(
        rover, { y: "-=300" }, { duration: 1, y: "+=300", ease: "bounce.out" }, "appear"
      )
      .to(stars, { duration: 1, autoAlpha: 1, stagger: 0.1 }, "appear")
      .to(asteroids, { duration: 1, autoAlpha: 1, stagger: 0.1 }, "appear")
      .addLabel("animate")
      .to(
        stars, { duration: 0.3, scale: 1.3, repeat: -1, repeatDelay: 0, yoyo: true }, "animate"
      )
      .to(
        asteroids, { duration: 1.5, rotation: 360, repeat: -1, ease: "linear" }, "animate"
      )
      .to(
        [auras, mars], { duration: 0.5, scale: 1.01, repeat: -1, yoyo: true }, "animate"
      )
      .to(
        [mars, skyObjects], { duration: 10, rotation: 360, ease: "linear", repeat: -1 }, "animate"
      )
      .to(
        rover, { duration: 0.2, scale: 1.01, y: "-=10", repeat: -1 }, "animate"
      )
      .fromTo(
        head, { rotation: 10 }, { duration: 0.3, rotation: -10, repeat: -1, yoyo: true }, "animate"
      )
      .to(
        flash, { duration: 0.05, scale: 5, repeat: -1, repeatDelay: 0.25, yoyo: true }, "animate"
      );
  }, []);

  return (
    <Wrapper>
      <Scene ref={scene} data-testid="mars" />
    </Wrapper>
  );
};

export default MarsSmall;
