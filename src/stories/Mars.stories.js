import React from "react";
import { addDecorator } from "@storybook/react";
import Mars from "../components/atoms/Mars";
import { GlobalStyles } from "../App";

addDecorator((s) => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "Mars",
  component: Mars,
};

export const Regular = () => <Mars />;
