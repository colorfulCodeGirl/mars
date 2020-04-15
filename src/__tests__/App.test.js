import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "../App";

describe("App component", () => {
  it("changes changes form display if photos are shown", () => {
    const { getByTestId, getByLabelText, getByText } = render(<App />);

    const form = getByTestId("form");
    expect(form).toHaveStyle(`
    justify-self: center;
    align-self: center;
    `);

    const select = getByLabelText(/choose rover/i);
    fireEvent.change(select, { target: { value: "curiosity" } });

    // const inputSol = getByPlaceholderText(/SOL from 0 to/i);
    // fireEvent.change(inputSol, { target: { value: "0" } });

    const button = getByText(/see latest/i);

    fireEvent.click(button);
    expect(form).toHaveStyle(`
        justify-self: start;
        align-self: stretch;
        height: 100vh;
        `);
  });
});
