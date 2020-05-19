import { fireEvent } from "@testing-library/react";
import gsap from "gsap";

export const chooseRover = (getByLabelText) => {
  fireEvent.change(getByLabelText(/choose rover/i), {
    target: { value: "Curiosity" },
  });
};

export const animateImmediately = () => {
  const tl = gsap.exportRoot();
  tl.totalProgress(1);
};
