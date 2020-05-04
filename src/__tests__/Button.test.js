import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../components/atoms/Button";

describe("Button component", () => {
  it("renders button element with correct text", () => {
    const { getByText, rerender } = render(
      <Button clickHandler={() => {}}>Search</Button>
    );
    expect(getByText(/search/i)).toBeInTheDocument();

    rerender(<Button clickHandler={() => {}}>See latest</Button>);
    expect(getByText(/see latest/i)).toBeInTheDocument();
  });

  it("can be disabled", () => {
    const { getByText, rerender } = render(
      <Button clickHandler={() => {}} isDisabled={true}>
        search
      </Button>
    );

    expect(getByText(/search/i)).toBeDisabled();

    rerender(
      <Button clickHandler={() => {}} isDisabled={false}>
        search
      </Button>
    );

    expect(getByText(/search/i)).toBeEnabled();
  });

  it("fires click handler", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button clickHandler={onClick} isDisabled={false}>
        search
      </Button>
    );

    const button = getByText(/search/i);
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
