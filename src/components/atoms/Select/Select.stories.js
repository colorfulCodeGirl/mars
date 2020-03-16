import React from "react";
import { addDecorator } from "@storybook/react";
import Select from "./Select";
import { GlobalStyles } from "../../../App";

addDecorator(s => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "Select",
  component: Select
};

export const Regular = () => (
  <Select type="text" placeholder="CAMERA">
    <option hidden>ROVER</option>
    <option>ROVER 1</option>
    <option>ROVER 2</option>
    <option>ROVER 3</option>
  </Select>
);
