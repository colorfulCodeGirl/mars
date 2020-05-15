import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Select from "../components/atoms/Select";

const renderSelect = (changeHandler = () => {}) =>
  render(
    <Select
      options={["one", "two"]}
      changeHandler={changeHandler}
      defaultValue="Choose rover"
      name="rover"
    />
  );

describe("Select element", () => {
  it("renders select input with label", () => {
    const { getByLabelText } = renderSelect();
    expect(getByLabelText(/choose rover/i)).toBeInTheDocument();
  });

  it("hides default option", () => {
    const { getAllByText } = renderSelect();
    const elements = getAllByText(/choose/i);
    expect(elements[1]).not.toBeVisible();
  });

  it("handles change event", () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderSelect(onChange);
    const select = getByLabelText(/choose rover/i);
    fireEvent.change(select, { target: { value: "two" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
