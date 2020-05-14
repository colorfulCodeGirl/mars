import { fireEvent } from "@testing-library/react";

export const chooseRover = (getByLabelText) => {
  fireEvent.change(getByLabelText(/choose rover/i), {
    target: { value: "Curiosity" },
  });
};
