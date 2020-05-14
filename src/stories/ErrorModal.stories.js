import React from "react";
import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";
import ErrorModal from "../components/molecules/ErrorModal";
import { GlobalStyles } from "../App";

addDecorator((s) => (
  <>
    <GlobalStyles />
    {s()}
  </>
));

export default {
  title: "ErrorModal",
  component: ErrorModal,
};

export const Regular = () => <ErrorModal closeHandler={action("clicked")} />;
