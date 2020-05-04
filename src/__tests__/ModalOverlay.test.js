import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ModalOverlay from "../components/atoms/ModalOverlay";

describe("ModalOverlay", () => {
  it("should be positioned absolute and take full screen", () => {
    const { getByTestId } = render(
      <ModalOverlay children="test" closeHandler={() => {}} />
    );
    const expectedStyle = `
        width: 100vw;
        height: 100vh;
        position: absolute;
    `;
    expect(getByTestId(/overlay/i)).toHaveStyle(expectedStyle);
  });
  it("should close modal on X click", () => {
    const closeHandler = jest.fn();
    const { getByLabelText } = render(
      <ModalOverlay children="test" closeHandler={closeHandler} />
    );
    const closeBtn = getByLabelText(/close/i);
    fireEvent.click(closeBtn);
    expect(closeHandler).toBeCalledTimes(1);
  });
});
