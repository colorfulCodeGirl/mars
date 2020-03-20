import React from "react";
import { render } from "@testing-library/react";
import ErrorTooltip from "../atoms/ErrorTooltip/ErrorTooltip";

describe("Error massage", () => {
  it("to be displayed", () => {
    const { getByText } = render(
      <ErrorTooltip message="error" isError={true} />
    );

    expect(getByText(/error/i)).toBeInTheDocument();
  });
});
