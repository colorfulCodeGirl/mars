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

  it("should change sol/date placeholder on sol/date change", async () => {
    const { getByLabelText, queryByPlaceholderText } = renderSearchForm();
    fireRoverChange(getByLabelText);

    let sol;
    let date;
    await waitFor(() => {
      sol = getByLabelText("SOL*");
      date = getByLabelText(/earth date/i);
    });

    const { landing_date, max_sol, max_date } = mockData.photo_manifest;
    expect(
      queryByPlaceholderText(`SOL from 0 to ${max_sol}`)
    ).toBeInTheDocument();
    expect(
      queryByPlaceholderText(`Date from ${landing_date} to ${max_date}`)
    ).not.toBeInTheDocument();

    fireEvent.click(date);
    expect(
      queryByPlaceholderText(`SOL from 0 to ${max_sol}`)
    ).not.toBeInTheDocument();
    expect(
      queryByPlaceholderText(`Date from ${landing_date} to ${max_date}`)
    ).toBeInTheDocument();
    fireEvent.click(sol);
    expect(
      queryByPlaceholderText(`SOL from 0 to ${max_sol}`)
    ).toBeInTheDocument();
    expect(
      queryByPlaceholderText(`Date from ${landing_date} to ${max_date}`)
    ).not.toBeInTheDocument();
  });

  it("should enable search button when sol input is filed correctly", async () => {
    const { getByLabelText, queryByText, getByText } = renderSearchForm();
    fireRoverChange(getByLabelText);

    let sol;
    await waitFor(() => {
      sol = getByLabelText(/SOL from 0/i);
    });
    fireEvent.change(sol, { target: { value: "234" } });
    const searchBtn = getByText(/search/i);
    expect(queryByText(/SOL should be/i)).not.toBeInTheDocument();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(sol, { target: { value: "4545454544544" } });
    expect(queryByText(/SOL should be/i)).toBeInTheDocument();
    expect(searchBtn).toBeDisabled();

    fireEvent.change(sol, { target: { value: "" } });
    expect(queryByText(/SOL should be/i)).not.toBeInTheDocument();
    expect(searchBtn).toBeDisabled();
  });

  it("should enable search button when date input is filed correctly", async () => {
    const { getByLabelText, queryByText, getByText } = renderSearchForm();
    fireRoverChange(getByLabelText);

    let date;
    await waitFor(() => {
      fireEvent.click(getByText(/earth date/i));
      date = getByLabelText(/Date from/i);
    });
    fireEvent.change(date, { target: { value: "2010-03-21" } });
    const searchBtn = getByText(/search/i);
    expect(queryByText(/Date should be/i)).not.toBeInTheDocument();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(date, { target: { value: "2020-03-21" } });
    expect(queryByText(/Date should be/i)).toBeInTheDocument();
    expect(searchBtn).toBeDisabled();

    fireEvent.change(date, { target: { value: "" } });
    expect(queryByText(/Date should be/i)).not.toBeInTheDocument();
    expect(searchBtn).toBeDisabled();
  });

  it("show error when fetching manifest fails", async () => {
    const { getByLabelText, getByText } = renderSearchForm();
    global.fetch.mockReset();
    global.fetch.mockImplementationOnce(() => new Error("Bad request"));
    fireEvent.change(getByLabelText(/choose rover/i), {
      target: { value: "Curiosity" },
    });
    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
