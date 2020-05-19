/* eslint-disable no-sparse-arrays */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import gsap from "gsap";
import PhotoModal from "../components/molecules/PhotoModal";
import { photosByQuery } from "../__response__mocks/photosByQuery";

const animateImmediately = () => {
  const tl = gsap.exportRoot();
  tl.totalProgress(1);
};

const { photos } = photosByQuery;

const renderPhotoModal = ([
  index,
  mobile = false,
  changeHandler = () => {},
  closeHandler = () => {},
  last,
]) =>
  render(
    <PhotoModal
      image={photos[index]}
      index={index}
      closeHandler={closeHandler}
      changeHandler={changeHandler}
      isMobile={mobile}
      last={last}
    />
  );

describe("Photo modal", () => {
  it("should show full image", () => {
    const { getByAltText } = renderPhotoModal([0]);
    const altText = `Mars by rover ${photos[0].rover.name}`;
    expect(getByAltText(altText)).toBeInTheDocument();
  });

  it("should show description of full image", () => {
    const { getByText } = renderPhotoModal([0]);
    const { rover } = photos[0];
    expect(getByText(`Mars by rover ${rover.name}`)).toBeInTheDocument();
    expect(getByText(/Photo taken on 2012-08-16/i)).toBeInTheDocument();
    expect(getByText(/10 days from landing/i)).toBeInTheDocument();
    expect(
      getByText(/By camera Chemistry and Camera Complex/i)
    ).toBeInTheDocument();
  });

  it("should change image on right arrow click and not react on left for first image", () => {
    const changeHandler = jest.fn();
    const { getByLabelText } = renderPhotoModal([0, , changeHandler]);
    const arrowRight = getByLabelText(/right/i);
    const arrowLeft = getByLabelText(/left/i);
    fireEvent.click(arrowRight);
    animateImmediately();
    expect(changeHandler).toBeCalledTimes(1);
    expect(changeHandler).toHaveBeenLastCalledWith(
      expect.stringMatching(/right/i)
    );
    fireEvent.click(arrowLeft);
    expect(changeHandler).toBeCalledTimes(1);
  });

  it("should change image on both arrows click for not first image", () => {
    const changeHandler = jest.fn();
    const { getByLabelText } = renderPhotoModal([1, , changeHandler]);
    const arrowRight = getByLabelText(/right/i);
    const arrowLeft = getByLabelText(/left/i);
    fireEvent.click(arrowRight);
    animateImmediately();
    expect(changeHandler).toBeCalledTimes(1);
    expect(changeHandler).toHaveBeenLastCalledWith(
      expect.stringMatching(/right/i)
    );
    fireEvent.click(arrowLeft);
    animateImmediately();
    expect(changeHandler).toBeCalledTimes(2);
    expect(changeHandler).toHaveBeenLastCalledWith(
      expect.stringMatching(/left/i)
    );
  });

  it("should have left arrow disabled for first image and enabled for other", () => {
    const { getByLabelText, rerender } = renderPhotoModal([0]);
    expect(getByLabelText(/left/i)).toBeDisabled();

    rerender(
      <PhotoModal
        image={photos[1]}
        index={1}
        closeHandler={() => {}}
        changeHandler={() => {}}
        isMobile={false}
      />
    );
    expect(getByLabelText(/left/i)).toBeEnabled();
  });

  it("should have right arrow disabled for the last one", () => {
    const lastIndex = photos.length - 1;
    const changeHandler = jest.fn;
    const { getByLabelText } = renderPhotoModal([
      lastIndex,
      ,
      changeHandler,
      ,
      lastIndex,
    ]);
    expect(getByLabelText(/right/i)).toBeDisabled();
    expect(getByLabelText(/left/i)).toBeEnabled();
  });

  it("should close full image on X click", () => {
    const closeHandler = jest.fn();
    const { getByLabelText } = renderPhotoModal([0, , , closeHandler]);
    const closeBtn = getByLabelText(/close/i);
    fireEvent.click(closeBtn);
    expect(closeHandler).toBeCalledTimes(1);
  });

  it("should not show arrows in mobile view", () => {
    const { queryByLabelText } = renderPhotoModal([0, true]);
    expect(queryByLabelText(/left/i)).toBeNull();
    expect(queryByLabelText(/right/i)).toBeNull();
  });

  it("should change image on image click in mobile view", () => {
    const changeHandler = jest.fn();
    const { getByAltText } = renderPhotoModal([1, true, changeHandler]);
    fireEvent.click(getByAltText(/mars/i));
    animateImmediately();
    expect(changeHandler).toBeCalledTimes(1);
    expect(changeHandler).toHaveBeenLastCalledWith(expect.any(Number));
  });
});
