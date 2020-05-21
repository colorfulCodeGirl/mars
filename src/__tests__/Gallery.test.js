import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import { Gallery } from "../components/organisms/Gallery";
import { photosByQuery } from "../__response__mocks/photosByQuery";
import { animateImmediately } from "../helpers/testHelpers";

const { photos } = photosByQuery;

const renderGallery = () => render(<Gallery photos={photos} />);

const openFullImg = (getAllByAltText) => {
  const imgs = getAllByAltText(/mars by rover/i);
    fireEvent.click(imgs[0]);
};

describe("Gallery", () => {
  it("shows photos from store", () => {
    const { getAllByAltText } = render(<Gallery photos={photos.slice(0, 5)} />);
    const imgs = getAllByAltText(/mars by rover/i);
    expect(imgs.length).toBe(5);
  });

  it("opens full image on click", () => {
    const { getAllByAltText, getByTestId } = renderGallery();
    act(() => {
      openFullImg(getAllByAltText)
    });
    const overlay = getByTestId(/overlay/i);
    expect(overlay).toBeInTheDocument();
    expect(overlay).toContainElement(getByTestId(/full-img/i));
  });

  it("should show next/previous photo on arrow click", () => {
    const { getAllByAltText, getByLabelText, getByTestId } = renderGallery();
    act(() => {
      openFullImg(getAllByAltText)
    });
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
    act(() => {
      fireEvent.click(getByLabelText(/right/i));
      animateImmediately();
    });
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[1].img_src);
    act(() => {
      fireEvent.click(getByLabelText(/left/i));
      animateImmediately();
    });
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
  });

  it("should show next/previous photo on photo click", () => {
    const { getAllByAltText, getByTestId } = renderGallery();
    act(() => {
      openFullImg(getAllByAltText)
    });
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
    const rightSide = window.innerWidth / 2 + 100;
    act(() => {
      fireEvent.click(getByTestId(/full-img/i), {
        clientX: rightSide,
      });
      animateImmediately();
    });
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[1].img_src);
    act(() => {
      fireEvent.click(getByTestId(/full-img/i), {
        clientX: 100,
      });
      animateImmediately();
    });
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
  });

  it("should not show next/previous photo on first photo click on left side", () => {
    const { getAllByAltText, getByTestId } = renderGallery();
    act(() => {
      openFullImg(getAllByAltText)
    });
    const img = getByTestId(/full-img/i);
    expect(img).toHaveAttribute("src", photos[0].img_src);
    act(() => {
      fireEvent.click(img, {
        clientX: 100,
      });
    })
    expect(getByTestId(/full-img/i)).toHaveAttribute("src", photos[0].img_src);
  });

  it("should close full image on X click", () => {
    const { getAllByAltText, getByLabelText, queryByTestId } = renderGallery();
    act(() => {
      openFullImg(getAllByAltText)
    });
    expect(queryByTestId(/full-img/i)).toBeInTheDocument();
    act(() => {
      fireEvent.click(getByLabelText(/close/i));
    })
    expect(queryByTestId(/full-img/i)).not.toBeInTheDocument();
  });
});
