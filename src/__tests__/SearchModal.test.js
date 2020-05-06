import React from "react";
import { render, fireEvent } from "@testing-library/react";
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
});
