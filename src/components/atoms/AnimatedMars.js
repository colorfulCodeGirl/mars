// import React, { useRef, useEffect } from "react";
// import PropTypes from "prop-types";
// import gsap from "gsap";
// import styled from "styled-components";

// import { ReactComponent as Mars } from "../../assets/mars.svg";

// const StyledContainer = styled.div`
//   position: relative;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 88vh;
//   max-height: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-end;
//   align-items: center;
//   overflow: hidden;
//   z-index: 4;
// `;

// const StyledMars = styled(Mars)`
//   width: 10rem;
//   height: 10rem;
//   transform: translateY(-1000%);
// `;

// const Shadow = styled.div`
//   width: 10rem;
//   height: 2rem;
//   opacity: 0;
//   background: radial-gradient(rgba(0, 0, 0, 0.5), transparent 60%);
// `;

// gsap.registerEffect({
//   name: "bouncePlanet",
//   effect: (target, config) => {
//     const tl = gsap.timeline({ repeat: -1 });
//     return tl
//       .to(
//         target,
//         {
//           yPercent: -160,
//           duration: 1.5,
//           ease: "bounce.in",
//         },
//         config.label
//       )
//       .to(target, {
//         yPercent: 0,
//         duration: 1.5,
//         ease: "bounce.out",
//       });
//   },
//   extendTimeline: true,
// });

// gsap.registerEffect({
//   name: "bounceShadow",
//   effect: (target, config) => {
//     const tl = gsap.timeline({ repeat: -1 });
//     return tl
//       .to(
//         target,
//         {
//           scale: 1.5,
//           duration: 1.5,
//           ease: "bounce.in",
//         },
//         config.label
//       )
//       .to(target, {
//         scale: 1,
//         duration: 1.5,
//         ease: "bounce.out",
//       });
//   },
//   extendTimeline: true,
// });

// const AnimatedMars = ({ isAnimating, onDone }) => {
//   const mars = useRef(null);
//   const shadow = useRef(null);

//   useEffect(() => {
//     const { current: planet } = mars;
//     const { current: shdw } = shadow;
//     const bouncing = gsap.timeline();

//     const bounce = () => {
//       bouncing
//         .addLabel("bounce")
//         .bouncePlanet(planet, { label: "bounce" })
//         .bounceShadow(shdw, { label: "bounce" });
//     };

//     if (isAnimating) {
//       bouncing
//         .addLabel("start")
//         .to(
//           planet,
//           {
//             y: 0,
//             duration: 1,
//             ease: "bounce.out",
//             onComplete: bounce,
//           },
//           "start"
//         )
//         .to(
//           shdw,
//           {
//             opacity: 1,
//             duration: 1,
//             ease: "none",
//           },
//           "start"
//         );
//     } else {
//       bouncing
//         .to(planet, {
//           y: 0,
//           duration: 0.3,
//         })
//         .addLabel("rollOut")
//         .to(
//           planet,
//           {
//             xPercent: 1000,
//             duration: 3,
//           },
//           "rollOut"
//         )
//         .to(
//           planet,
//           {
//             transformOrigin: "50% 50%",
//             rotation: 360,
//             duration: 0.3,
//             repeat: 10,
//             onComplete: onDone,
//           },
//           "rollOut"
//         )
//         .to(
//           shdw,
//           {
//             xPercent: 1000,
//             delay: 0.06,
//             duration: 3,
//           },
//           "rollOut"
//         );
//     }
//   }, [isAnimating, onDone]);

//   return (
//     <StyledContainer>
//       <StyledMars ref={mars} />
//       <Shadow ref={shadow} />
//     </StyledContainer>
//   );
// };

// export default AnimatedMars;

// AnimatedMars.propTypes = {
//   isAnimating: PropTypes.bool.isRequired,
//   onDone: PropTypes.func,
// };
