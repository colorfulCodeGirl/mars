import React from "react";
import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";
import Button from "./Button";
import { GlobalStyles } from "../../../App";

addDecorator(s => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "Button",
  component: Button
};

export const Regular = () => (
  <Button onClick={action("clicked")}>SEARCH</Button>
);

export const Disabled = () => (
  <Button onClick={action("clicked")} disabled>
    SEARCH
  </Button>
);
