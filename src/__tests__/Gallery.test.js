import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Gallery } from "../components/organisms/Gallery";
import { photos } from "./mocks/photos";

const renderGallery = () => render(<Gallery photos={photos} />);

describe("Gallery", () => {
  it("shows photos from store", async () => {
    const { getAllByAltText } = render(<Gallery photos={photos.slice(0, 5)} />);

    await waitFor(() => {
      const imgs = getAllByAltText(/mars by rover Curiosity/i);
      expect(imgs.length).toBe(5);
    });
  });
  it("should show next photos on scroll", () => {});
  it("opens full image on click", () => {});
  it("should show next/previous photo on arrow click", () => {});
  it("should show next/previous photo on photo click", () => {});
  it("should close full image on X click", () => {});
});
