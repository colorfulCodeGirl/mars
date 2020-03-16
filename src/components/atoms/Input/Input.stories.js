import React from "react";
import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";
import Input from "./Input";
import { GlobalStyles } from "../../../App";

addDecorator(s => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "Input",
  component: Input
};

export const Regular = () => <Input type="text" placeholder="CAMERA" />;
