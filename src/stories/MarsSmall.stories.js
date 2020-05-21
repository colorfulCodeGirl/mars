import React from "react";
import { addDecorator } from "@storybook/react";
import MarsSmall from "../components/atoms/MarsSmall";
import { GlobalStyles } from "../App";

addDecorator((s) => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "MarsSmall",
  component: MarsSmall,
};

export const Regular = () => <MarsSmall />;
