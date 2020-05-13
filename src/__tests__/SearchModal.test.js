import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../store/store";
import SearchModal from "../components/molecules/SearchModal";

const store = configureStore();

const renderSearchModal = () =>
  render(
    <Provider store={store}>
      <SearchModal />
    </Provider>
  );

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn().mockReturnValue([]),
}));

const pickRover = (getByLabelText) => {
  const mockData = {
    photo_manifest: {
      landing_date: "2004-01-04",
      max_sol: 2208,
      max_date: "2010-03-21",
    },
  };

  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ ok: true, json: () => mockData })
    );

  fireEvent.change(getByLabelText(/choose rover/i), {
    target: { value: "Curiosity" },
  });
};

describe("SearchModal", () => {
  it("should render button, but not modal on start", () => {
    const { getByText, queryByTestId } = renderSearchModal();
    expect(getByText(/change search/i)).toBeInTheDocument();
    expect(queryByTestId(/form/i)).not.toBeInTheDocument();
  });
  it("should open/close modal on button click", async () => {
    const { getByText, queryByTestId, getByLabelText } = renderSearchModal();
    fireEvent.click(getByText(/change search/i));
    expect(queryByTestId(/form/i)).toBeInTheDocument();

    fireEvent.click(getByLabelText(/close/i));
    expect(queryByTestId(/form/i)).not.toBeInTheDocument();
  });
  it("should close modal on new search (see latest)", async () => {
    const { getByText, queryByTestId, getByLabelText } = renderSearchModal();
    fireEvent.click(getByText(/change search/i));
    expect(queryByTestId(/form/i)).toBeInTheDocument();

    pickRover(getByLabelText);

    await waitFor(() => {
      const seeLatestBtn = getByText(/see latest/i);
      expect(seeLatestBtn).toBeEnabled();
      fireEvent.click(seeLatestBtn);
    });
    expect(queryByTestId(/form/i)).not.toBeInTheDocument();
  });
  it("should close modal on new search (search)", async () => {
    const { getByText, queryByTestId, getByLabelText } = renderSearchModal();
    fireEvent.click(getByText(/change search/i));
    expect(queryByTestId(/form/i)).toBeInTheDocument();

    pickRover(getByLabelText);

    await waitFor(() => {
      const solInput = getByLabelText(/sol from 0/i);
      expect(solInput).toBeInTheDocument();
      fireEvent.change(solInput, { target: { value: "54" } });
    });
    const searchBtn = getByText(/search/i);
    expect(searchBtn).toBeEnabled();
    fireEvent.click(searchBtn);
    expect(queryByTestId(/form/i)).not.toBeInTheDocument();
  });
});
