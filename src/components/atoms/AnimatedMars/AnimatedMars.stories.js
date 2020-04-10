import React, { useState, useEffect } from "react";
import { addDecorator } from "@storybook/react";
import AnimatedMars from "./AnimatedMars";
import { GlobalStyles } from "../../../App";

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
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    setIsAnimating(true);
  }, []);
  return <AnimatedMars isAnimating={isAnimating} />;
};
