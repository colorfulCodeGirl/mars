import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RadioGroup from "../components/atoms/RadioGroup";

const renderRadioGroup = (checkedIndex = 0, changeHandler = () => {}) =>
  render(
    <RadioGroup
      options={["one", "two"]}
      category="sol"
      changeHandler={changeHandler}
      checkedIndex={checkedIndex}
    />
  );

describe("Radio group component", () => {
  it("to render properly", () => {
    const { getByLabelText } = renderRadioGroup();

    expect(getByLabelText(/one/i)).toBeInTheDocument();
    expect(getByLabelText(/two/i)).toBeInTheDocument();
  });

  it("to have first option checked by default", () => {
    const { getByLabelText } = renderRadioGroup();

    expect(getByLabelText(/one/i)).toBeChecked();
    expect(getByLabelText(/two/i)).not.toBeChecked();
  });

  it("to have other option checked", () => {
    const { getByLabelText } = renderRadioGroup(1);

    expect(getByLabelText(/one/i)).not.toBeChecked();
    expect(getByLabelText(/two/i)).toBeChecked();
  });

  it("should fire click event", () => {
    const clickHandler = jest.fn();
    const { getByLabelText } = renderRadioGroup(0, clickHandler);
    fireEvent.click(getByLabelText(/two/i));
    expect(clickHandler).toBeCalledTimes(1);
  });
});
