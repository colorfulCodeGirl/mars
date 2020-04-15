import React from "react";
import { addDecorator } from "@storybook/react";
import Select from "../components/atoms/Select";
import { GlobalStyles } from "../App";

addDecorator((s) => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "Select",
  component: Select,
};

const options = ["Rover 1", "Rover 2", "Rover 3"];

export const Regular = () => (
  <Select name="rovers" options={options} defaultValue="Rover" />
);
