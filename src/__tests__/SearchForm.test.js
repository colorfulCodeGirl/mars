import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "../components/organisms/SearchForm";
import { Provider } from "react-redux";

import configureStore from "../store/store";
const store = configureStore();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn().mockReturnValue([]),
}));

const mockData = {
  photo_manifest: {
    launch_date: "2003-06-10",
    max_sol: 2208,
    max_date: "2010-03-21",
  },
};

global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.resolve({ ok: true, json: () => mockData })
  );

const renderSearchForm = () =>
  render(
    <Provider store={store}>
      <SearchForm displayLeft={false} />
    </Provider>
  );

const fireRoverChange = (getByLabelText) => {
  const select = getByLabelText(/choose rover/i);
  fireEvent.change(select, { target: { value: "Curiosity" } });
};

describe("Search form component on start", () => {
  it("renders heading", () => {
    const { getByText } = renderSearchForm();
    expect(getByText(/explore/i)).toBeInTheDocument();
  });

  it("renders select element for rovers on start", () => {
    const { getByLabelText } = renderSearchForm();
    expect(getByLabelText(/rover/i)).toBeInTheDocument();
  });

  it("doesn't render radio group and sol input on start", () => {
    const { queryByLabelText } = renderSearchForm();

    expect(queryByLabelText(/sol/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/earth date/i)).not.toBeInTheDocument();
  });

  it("has disabled search and see latest button on start", () => {
    const { getByText } = renderSearchForm();
    expect(getByText(/search/i)).toBeDisabled();
    expect(getByText(/see latest/i)).toBeDisabled();
  });

  it("it fetches rover manifest and shows sol radio group and sol input", async () => {
    const { getByLabelText, getByRole } = renderSearchForm();
    fireRoverChange(getByLabelText);
    await waitFor(() => {
      expect(getByRole("radiogroup")).toBeInTheDocument();
      expect(getByLabelText(/SOL from 0 to/i)).toBeInTheDocument();
    });
  });

  it("shows animation while fetching manifest", () => {});

  it("it enables see latest button when rover is set, search button is still disabled", async () => {
    const { getByLabelText, getByText } = renderSearchForm();
    fireRoverChange(getByLabelText);
    await waitFor(() => {
      expect(getByText(/see latest/i)).toBeEnabled();
      expect(getByText(/search/i)).toBeDisabled();
    });
  });

  it("should handle change sol/date radio group correctly", async () => {
    const { getByLabelText } = renderSearchForm();
    fireRoverChange(getByLabelText);

    let sol;
    let date;
    await waitFor(() => {
      sol = getByLabelText("SOL*");
      date = getByLabelText(/earth date/i);
    });
    expect(sol).toBeChecked();
    expect(date).not.toBeChecked();
    fireEvent.click(date);
    expect(sol).not.toBeChecked();
    expect(date).toBeChecked();
    fireEvent.click(sol);
    expect(sol).toBeChecked();
    expect(date).not.toBeChecked();
  });
});
