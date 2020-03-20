import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "./Select";

describe("Select element", () => {
  it("renders select input with label", () => {
    const { getByLabelText } = render(
      <Select
        options={["one", "two"]}
        changeHandler={() => {}}
        defaultValue="Choose rover"
        name="rover"
      />
    );

    expect(getByLabelText(/choose rover/i)).toBeInTheDocument();
  });
  it("hides default option", () => {
    const { getAllByText } = render(
      <Select
        options={["one", "two"]}
        changeHandler={() => {}}
        defaultValue="Choose rover"
        name="rover"
      />
    );

    const elements = getAllByText(/choose/i);
    expect(elements[1]).not.toBeVisible();
  });
  it("handles change event", () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <Select
        options={["one", "two"]}
        changeHandler={onChange}
        defaultValue="Choose rover"
        name="rover"
      />
    );
    const select = getByLabelText(/choose rover/i);
    fireEvent.change(select, { target: { value: "two" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
