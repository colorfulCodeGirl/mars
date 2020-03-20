import React from "react";
import { render } from "@testing-library/react";
import RadioGroup from "../atoms/RadioGroup/RadioGroup";

describe("Radio group component", () => {
  it("to render properly", () => {
    const { getByLabelText } = render(
      <RadioGroup
        options={["one", "two"]}
        category="sol"
        changeHandler={() => {}}
      />
    );

    expect(getByLabelText(/one/i)).toBeInTheDocument();
    expect(getByLabelText(/two/i)).toBeInTheDocument();
  });

  it("to have first option checked by default", () => {
    const { getByLabelText } = render(
      <RadioGroup
        options={["one", "two"]}
        category="sol"
        changeHandler={() => {}}
      />
    );

    expect(getByLabelText(/one/i)).toBeChecked();
    expect(getByLabelText(/two/i)).not.toBeChecked();
  });

  it("to have other option checked", () => {
    const { getByLabelText } = render(
      <RadioGroup
        options={["one", "two"]}
        category="sol"
        changeHandler={() => {}}
        checkedIndex={1}
      />
    );

    expect(getByLabelText(/one/i)).not.toBeChecked();
    expect(getByLabelText(/two/i)).toBeChecked();
  });
});
