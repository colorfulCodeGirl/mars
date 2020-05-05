import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Input from "../components/atoms/Input";

describe("Input component", () => {
  it("renders input element", () => {
    const { getByLabelText } = render(
      <Input
        placeholder="sol"
        name="sol"
        changeHandler={() => {}}
        value="sol"
      />
    );
    expect(getByLabelText(/sol/i)).toBeInTheDocument();
  });
  it("displays placeholder", () => {
    let placeholderText = "sol placeholder";
    const { getByPlaceholderText } = render(
      <Input
        placeholder={placeholderText}
        label="sol"
        name="sol"
        changeHandler={() => {}}
        value="sol"
      />
    );

    expect(getByPlaceholderText(placeholderText)).toBeInTheDocument();
  });
  it("fires change event", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Input
        placeholder="sol"
        name="sol"
        changeHandler={onChange}
        value="sol"
      />
    );

    const input = getByLabelText(/sol/i);
    fireEvent.change(input, { target: { value: "35" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
