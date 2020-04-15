import React, { useState, useEffect } from "react";
import { addDecorator } from "@storybook/react";
import AnimatedMars from "../components/atoms/AnimatedMars";
import { GlobalStyles } from "../App";

addDecorator((s) => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "AnimatedMars",
  component: AnimatedMars,
};

export const Regular = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAnimating(false), 7000);
  }, []);

  return <AnimatedMars isAnimating={isAnimating} />;
};
