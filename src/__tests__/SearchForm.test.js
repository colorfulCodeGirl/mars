import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "../components/organisms/SearchForm";
import { Provider } from "react-redux";
import { mockManifest } from "../__response__mocks/mockManifest";
import configureStore from "../store/store";
import { chooseRover } from "../test-helpers";
import MarsSmall from "../components/atoms/MarsSmall";

global.fetch = jest.fn();
jest.mock("../components/atoms/MarsSmall");
MarsSmall.mockImplementation(() => <p>animation</p>);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn().mockReturnValue([]),
}));
jest.mock("react-transition-group", () => ({
  Transition: (props) => (props.in ? props.children : null),
}));

const renderSearchForm = () => {
  const store = configureStore();
  return render(
    <Provider store={store}>
      <SearchForm displayLeft={false} show />
    </Provider>
  );
};

describe("Search form component on start", () => {
  beforeEach(() => {
    global.fetch.mockReset();
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => mockManifest })
    );
  });

  it("renders heading and select element for rovers on start", () => {
    const { getByText, getByLabelText } = renderSearchForm();
    expect(getByText(/explore/i)).toBeInTheDocument();
    expect(getByLabelText(/rover/i)).toBeInTheDocument();
  });

  it("doesn't render radio group and sol input on start", () => {
    const { queryByLabelText } = renderSearchForm();

    expect(queryByLabelText(/day from landing/i)).not.toBeInTheDocument();
    expect(queryByLabelText(/earth date/i)).not.toBeInTheDocument();
  });

  it("has disabled search and see latest button on start", () => {
    const { getByText } = renderSearchForm();
    expect(getByText(/search/i)).toBeDisabled();
    expect(getByText(/see latest/i)).toBeDisabled();
  });

  it("fetches rover manifest and shows sol radio group and sol input", async () => {
    const { getByLabelText, getByRole, queryByText } = renderSearchForm();

    chooseRover(getByLabelText);
    expect(queryByText(/animation/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(getByRole("radiogroup")).toBeInTheDocument();
      expect(getByLabelText(/Day from landing from 0 to/i)).toBeInTheDocument();
      expect(queryByText(/animation/i)).not.toBeInTheDocument();
    });
  });

  it("it enables see latest button when rover is set, search button is still disabled", async () => {
    const { getByLabelText, getByText } = renderSearchForm();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByText(/see latest/i)).toBeEnabled();
      expect(getByText(/search/i)).toBeDisabled();
    });
  });

  it("should handle change sol/date radio group correctly", async () => {
    const { getByLabelText } = renderSearchForm();
    chooseRover(getByLabelText);
    let sol;
    let date;
    await waitFor(() => {
      sol = getByLabelText(/day from landing/i);
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
    chooseRover(getByLabelText);
    let sol;
    let date;
    await waitFor(() => {
      sol = getByLabelText("Day from landing");
      date = getByLabelText(/earth date/i);
    });

    const { landing_date, max_sol, max_date } = mockManifest.photo_manifest;
    expect(
      queryByPlaceholderText(`Day from landing from 0 to ${max_sol}`)
    ).toBeInTheDocument();
    expect(
      queryByPlaceholderText(`Date from ${landing_date} to ${max_date}`)
    ).not.toBeInTheDocument();

    fireEvent.click(date);
    expect(
      queryByPlaceholderText(`Day from landing from 0 to ${max_sol}`)
    ).not.toBeInTheDocument();
    expect(
      queryByPlaceholderText(`Date from ${landing_date} to ${max_date}`)
    ).toBeInTheDocument();
    fireEvent.click(sol);
    expect(
      queryByPlaceholderText(`Day from landing from 0 to ${max_sol}`)
    ).toBeInTheDocument();
    expect(
      queryByPlaceholderText(`Date from ${landing_date} to ${max_date}`)
    ).not.toBeInTheDocument();
  });

  it("should enable search button when sol input is filed correctly", async () => {
    const { getByLabelText, queryByText, getByText } = renderSearchForm();
    chooseRover(getByLabelText);
    let sol;
    await waitFor(() => {
      sol = getByLabelText(/Day from landing from 0/i);
    });
    fireEvent.change(sol, { target: { value: "234" } });
    const searchBtn = getByText(/search/i);
    expect(queryByText(/day from landing should be/i)).not.toBeInTheDocument();
    expect(searchBtn).toBeEnabled();

    fireEvent.change(sol, { target: { value: "4545454544544" } });
    expect(queryByText(/day from landing should be/i)).toBeInTheDocument();
    expect(searchBtn).toBeDisabled();

    fireEvent.change(sol, { target: { value: "" } });
    expect(queryByText(/day from landing should be/i)).not.toBeInTheDocument();
    expect(searchBtn).toBeDisabled();
  });

  it("should enable search button when date input is filed correctly", async () => {
    const { getByLabelText, queryByText, getByText } = renderSearchForm();
    chooseRover(getByLabelText);

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
});
