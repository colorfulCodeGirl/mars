import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PhotoModal from "../components/molecules/PhotoModal";
import { photosByQuery } from "../__response__mocks/photosByQuery";

const { photos } = photosByQuery;

const renderPhotoModal = (img, index) =>
  render(
    <PhotoModal
      image={img}
      index={index}
      closeHandler={() => {}}
      changeHandler={() => {}}
      isMobile={false}
    />
  );

describe("Photo modal", () => {
  it("should show full image", () => {
    const { getByAltText } = renderPhotoModal(photos[0], 0);
    const altText = `Mars by rover ${photos[0].rover.name}`;
    expect(getByAltText(altText)).toBeInTheDocument();
  });
  it("should show description of full image", () => {
    const { getByText } = renderPhotoModal(photos[0], 0);
    const heading = getByText(/mars by rover/i);
    const description = getByText(/Photo taken on/i);
    expect(description).toBeInTheDocument();
    expect(heading.innerHTML).toContain(photos[0].rover.name);
    // expect(description).toContain(photos[0].camera.full_name);
  });
  it("should change image on right arrow click and not react on left for first image", () => {
    const changeHandler = jest.fn();
    const { getByLabelText } = render(
      <PhotoModal
        image={photos[0]}
        index={0}
        closeHandler={() => {}}
        changeHandler={changeHandler}
        isMobile={false}
      />
    );
    const arrowRight = getByLabelText(/right/i);
    const arrowLeft = getByLabelText(/left/i);
    fireEvent.click(arrowRight);
    expect(changeHandler).toBeCalledTimes(1);
    expect(changeHandler).toHaveBeenLastCalledWith(
      expect.stringMatching(/right/i)
    );
    fireEvent.click(arrowLeft);
    expect(changeHandler).toBeCalledTimes(1);
  });
  it("should change image on both arrows click for not first image", () => {
    const changeHandler = jest.fn();
    const { getByLabelText } = render(
      <PhotoModal
        image={photos[1]}
        index={1}
        closeHandler={() => {}}
        changeHandler={changeHandler}
        isMobile={false}
      />
    );
    const arrowRight = getByLabelText(/right/i);
    const arrowLeft = getByLabelText(/left/i);
    fireEvent.click(arrowRight);
    expect(changeHandler).toBeCalledTimes(1);
    expect(changeHandler).toHaveBeenLastCalledWith(
      expect.stringMatching(/right/i)
    );
    fireEvent.click(arrowLeft);
    expect(changeHandler).toBeCalledTimes(2);
    expect(changeHandler).toHaveBeenLastCalledWith(
      expect.stringMatching(/left/i)
    );
  });
  it("should have left arrow disabled for first image and enabled for other", () => {
    const { getByLabelText, rerender } = renderPhotoModal(photos[0], 0);
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
  //!!!!!!!!!!!!!!!!TODO!!!!!!!!!!!!!!!!!!!//
  it("should have right arrow disabled for the last one", () => {});
  it("should close full image on X click", () => {
    const closeHandler = jest.fn();
    const { getByLabelText } = render(
      <PhotoModal
        image={photos[0]}
        index={0}
        closeHandler={closeHandler}
        changeHandler={() => {}}
        isMobile={false}
      />
    );
    const closeBtn = getByLabelText(/close/i);
    fireEvent.click(closeBtn);
    expect(closeHandler).toBeCalledTimes(1);
  });
  it("should not show arrows in mobile view", () => {
    const { queryByLabelText } = render(
      <PhotoModal
        image={photos[0]}
        index={0}
        changeHandler={() => {}}
        closeHandler={() => {}}
        isMobile={true}
      />
    );
    expect(queryByLabelText(/left/i)).toBeNull();
    expect(queryByLabelText(/right/i)).toBeNull();
  });
  it("should change image on image click in mobile view", () => {
    const changeHandler = jest.fn();
    const { getByAltText } = render(
      <PhotoModal
        image={photos[1]}
        index={1}
        closeHandler={() => {}}
        changeHandler={changeHandler}
        isMobile={true}
      />
    );
    fireEvent.click(getByAltText(/mars/i));
    expect(changeHandler).toBeCalledTimes(1);
    expect(changeHandler).toHaveBeenLastCalledWith(expect.any(Number));
  });
});
