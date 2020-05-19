/*eslint object-property-newline: ["error", { "allowAllPropertiesOnSameLine": true }]*/
/*eslint function-call-argument-newline: ["error", "never"]*/
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
    const auras = current.querySelectorAll(".aura");
    const head = current.querySelector('.head-group');
    const flash = current.querySelector('#flash');

    gsap.set([current, ...stars, ...asteroids, rover], { autoAlpha: 0 });
    gsap.set([...stars, ...asteroids, ...auras, flash], {transformOrigin: "center center"});
    gsap.set(rover, { transformOrigin: `center 310%` });
    gsap.set(head, {transformOrigin: "100% center"});
    gsap.set(flash, {x: '-=30', scale: 0});

    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

    tl.to(current, { duration: 0.7, autoAlpha: 1 })
      .addLabel("appear")
      .to(rover, {duration: 0.5, autoAlpha: 1}, "appear")
      .fromTo(rover, { y: "-=300" }, { duration: 1, y: "+=300", ease: "bounce.out" }, "appear")
      .to(stars, { duration: 1, autoAlpha: 1, stagger: 0.1 }, "appear")
      .to(asteroids, { duration: 1, autoAlpha: 1, stagger: 0.1 }, "appear")
      .addLabel("animate")
      .to(stars, { duration: 0.3, scale: 1.3, repeat: -1, repeatDelay: 0, yoyo: true }, "animate")
      .to(asteroids, {duration: 1.5, rotation: 360, repeat: -1, ease: "linear"}, "animate")
      .to(auras, {duration: 0.5, scale: 1.02, stager: 0.2, repeat: -1, yoyo: true,}, "animate")
      .to(rover, { duration: 7, rotation: -360, ease: "linear", repeat: -1 }, "animate")
      .to(rover, { duration: 0.2, scale: 1.02, y: "-=1", repeat: -1 }, "animate")
      .fromTo(head, {rotation: 10}, {duration: 0.3, rotation: -10, repeat: -1, yoyo: true}, "animate")
      .to(flash, {duration: 0.05, scale: 5, repeat: -1, repeatDelay: .25, yoyo: true}, "animate")
  }, []);

  return (
    <Wrapper>
      <Scene ref={scene} data-testid="mars"/>
    </Wrapper>
  );
};

export default Mars;
