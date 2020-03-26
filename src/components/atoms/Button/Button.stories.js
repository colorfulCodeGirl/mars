import React from "react";
import { action } from "@storybook/addon-actions";
import { addDecorator } from "@storybook/react";
import Button from "./Button";
import { GlobalStyles } from "../../../App";
import menuIcon from "../../../assets/menu.png";
import background from "../../../assets/background.png";

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

export const withIcon = () => (
  <Button onClick={action("clicked")} icon={menuIcon}>
    SEARCH
  </Button>
);

export const greyWithIcon = () => {
  const backgroundStyle = {
    width: "300px",
    height: "200px",
    backgroundImage: `url(${background})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat"
  };

  return (
    <div style={backgroundStyle}>
      <Button onClick={action("clicked")} isGrey={true} icon={menuIcon}>
        SEARCH
      </Button>
    </div>
  );
};
