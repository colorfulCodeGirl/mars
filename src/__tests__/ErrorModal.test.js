import React from "react";
import { render } from "@testing-library/react";
import ErrorModal from "../components/molecules/ErrorModal";

describe("Error Modal", () => {
  it("shows default error massage", () => {
    const { getByText } = render(<ErrorModal closeHandler={() => {}} />);
    expect(getByText(/something went wrong/i)).toBeInTheDocument();
  });
  it("shows custom error massage", () => {});
});
