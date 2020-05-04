import React from "react";
import { render } from "@testing-library/react";
import ErrorTooltip from "../components/atoms/ErrorTooltip";

describe("Error massage", () => {
  it("to be displayed if it has message", () => {
    const { queryByTestId, rerender } = render(
      <ErrorTooltip message="error" />
    );
    expect(queryByTestId(/error/i)).toBeInTheDocument();

    rerender(<ErrorTooltip message="" />);
    expect(queryByTestId(/error/i)).not.toBeInTheDocument();
  });
});
