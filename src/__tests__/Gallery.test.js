import React from "react";
import { render, fireEvent, prettyDOM, waitFor } from "@testing-library/react";
import { Gallery } from "../components/organisms/Gallery";
import { photos } from "../__mocks__/photos";

const renderGallery = () => render(<Gallery photos={photos} />);

const openFullImg = (getAllByAltText) => {
  const imgs = getAllByAltText(/mars by rover Curiosity/i);
  fireEvent.click(imgs[0]);
};

describe("Gallery", () => {
  it("shows photos from store", () => {
    const { getAllByAltText } = render(<Gallery photos={photos.slice(0, 5)} />);
    const imgs = getAllByAltText(/mars by rover Curiosity/i);
    expect(imgs.length).toBe(5);
  });
  it("opens full image on click", () => {
    const { getAllByAltText, getByTestId } = renderGallery();
    openFullImg(getAllByAltText);
    const overlay = getByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    expect(overlay).toContainElement(getByTestId(/full-img/i));
  });
  it("should show next/previous photo on arrow click", () => {
    const { getAllByAltText, getByLabelText, getByTestId } = renderGallery();
    openFullImg(getAllByAltText);
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
    fireEvent.click(getByLabelText(/right/i));
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[1].img_src);
    fireEvent.click(getByLabelText(/left/i));
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
  });
  it("should show next/previous photo on photo click", () => {});
  it("should close full image on X click", () => {});
});
