import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Gallery } from "../components/organisms/Gallery";

const photos = [
  {
    id: 3132,
    img_src:
      "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/soas/rdr/ccam/CR0_398380645PRCLF0030000CCAM04010L1.PNG",
    rover: { name: "Curiosity" },
  },
  {
    id: 58870,
    img_src:
      "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381687EDR_F0030000CCAM05010M_.JPG",
    rover: { name: "Curiosity" },
  },
  {
    id: 58871,
    img_src:
      "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381577EDR_F0030000CCAM05010M_.JPG",
    rover: { name: "Curiosity" },
  },
  {
    id: 58872,
    img_src:
      "http://mars.jpl.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/00010/opgs/edr/ccam/CR0_398381468EDR_F0030000CCAM05010M_.JPG",
    rover: { name: "Curiosity" },
  },
];

const renderGallery = () => render(<Gallery photos={photos} />);

describe("Gallery", () => {
  it("shows photos from store", async () => {
    const { getAllByAltText } = renderGallery();

    await waitFor(() => {
      const photos = getAllByAltText(/mars by rover Curiosity/i);
      expect(photos.length).toBe(4);
    });
  });
  it("should show next photos on scroll", () => {});
  it("opens full image on click", () => {});
  it("should show next/previous photo on arrow click", () => {});
  it("should show next/previous photo on photo click", () => {});
  it("should close full image on X click", () => {});
});
