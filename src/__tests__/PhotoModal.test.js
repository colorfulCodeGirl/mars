import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhotoModal from "../components/molecules/PhotoModal";

const image = [
  { src: "test_0", alt: "Mars by rover Curiosity", index: 0 },
  { src: "test_1", alt: "Mars by rover Curiosity", index: 1 },
];

const renderPhotoModal = (img) =>
  render(
    <PhotoModal
      image={img}
      closeHandler={() => {}}
      changeHandler={() => {}}
      isMobile={false}
    />
  );

describe("Photo modal", () => {
  const { getByAltText } = renderPhotoModal(image[0]);
  it("should show full image", () => {
    expect(getByAltText(image[0].alt)).toBeInTheDocument();
  });
  //!!!!!!!!!!!!!!!!TODO!!!!!!!!!!!!!!!!!!!//
  it("should show description of full image", () => {});
  it("should change image on right arrow click and not react on left for first image", () => {
    const changeHandler = jest.fn();
    const { getByLabelText } = render(
      <PhotoModal
        image={image[0]}
        closeHandler={() => {}}
        changeHandler={changeHandler}
        isMobile={false}
      />
    );
    const arrowRight = getByLabelText(/right/i);
    const arrowLeft = getByLabelText(/left/i);
    fireEvent.click(arrowRight);
    expect(changeHandler).toBeCalledTimes(1);
    fireEvent.click(arrowLeft);
    expect(changeHandler).toBeCalledTimes(1);
  });
  it("should change image on both arrows click for not first image", () => {
    const changeHandler = jest.fn();
    const { getByLabelText } = render(
      <PhotoModal
        image={image[1]}
        closeHandler={() => {}}
        changeHandler={changeHandler}
        isMobile={false}
      />
    );
    const arrowRight = getByLabelText(/right/i);
    const arrowLeft = getByLabelText(/left/i);
    fireEvent.click(arrowRight);
    expect(changeHandler).toBeCalledTimes(1);
    fireEvent.click(arrowLeft);
    expect(changeHandler).toBeCalledTimes(2);
  });
  it("should have left arrow disabled for first image and enabled for other", () => {
    const { getByLabelText, rerender } = renderPhotoModal(image[0]);
    expect(getByLabelText(/left/i)).toBeDisabled();

    rerender(
      <PhotoModal
        image={image[1]}
        closeHandler={() => {}}
        changeHandler={() => {}}
        isMobile={false}
      />
    );
    expect(getByLabelText(/left/i)).toBeEnabled();
  });
  //!!!!!!!!!!!!!!!!TODO!!!!!!!!!!!!!!!!!!!//
  it("should have right arrow disabled for the last one", () => {});
  it("should close full image on X click", () => {
    const closeHandler = jest.fn();
    const { getByLabelText } = render(
      <PhotoModal
        image={image[1]}
        closeHandler={closeHandler}
        changeHandler={() => {}}
        isMobile={false}
      />
    );
    const closeBtn = getByLabelText(/close/i);
    fireEvent.click(closeBtn);
    expect(closeHandler).toBeCalledTimes(1);
  });
});
