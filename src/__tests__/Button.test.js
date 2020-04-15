import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button from "../components/atoms/Button";

describe("Button component", () => {
  it("renders button element", () => {
    const { getByText } = render(
      <Button submitHandler={() => {}}>Search</Button>
    );

    expect(getByText(/search/i)).toBeInTheDocument();
  });

  it("can be disabled", () => {
    const { getByText, rerender } = render(
      <Button submitHandler={() => {}} isDisabled={true}>
        search
      </Button>
    );

    expect(getByText(/search/i).disabled).toBe(true);

    rerender(
      <Button submitHandler={() => {}} isDisabled={false}>
        search
      </Button>
    );

    expect(getByText(/search/i).disabled).toBe(false);
  });

  it("fires submit handler", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button submitHandler={onClick} isDisabled={false}>
        search
      </Button>
    );

    const button = getByText(/search/i);
    expect(button.disabled).toBe(false);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("doesn't fires submit handler when disabled", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Button submitHandler={onClick} isDisabled={true}>
        search
      </Button>
    );

    const button = getByText(/search/i);
    expect(button.disabled).toBe(true);
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
