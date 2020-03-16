import React from "react";
import { addDecorator } from "@storybook/react";
import RadioGroup from "./RadioGroup";
import { GlobalStyles } from "../../../App";

addDecorator(s => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "RadioGroup",
  component: RadioGroup
};

const options = ["SOL", "Earth Date"];

export const Regular = () => <RadioGroup options={options} category="mode" />;
