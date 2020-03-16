import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./Button";

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
