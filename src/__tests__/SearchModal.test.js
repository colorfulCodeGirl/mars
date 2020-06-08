import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "../store/store";
import SearchModal from "../components/molecules/SearchModal";
import { mockManifest } from "../__response__mocks/mockManifest";
import { chooseRover } from "../test-helpers";
import MarsSmall from "../components/atoms/MarsSmall";

jest.mock("../components/atoms/MarsSmall");
MarsSmall.mockImplementation(() => <p>animation</p>);
jest.mock("react-transition-group", () => ({
  Transition: (props) => (props.in ? props.children : null),
}));

const renderSearchModal = () => {
  const store = configureStore();
  return render(
    <Provider store={store}>
      <SearchModal />
    </Provider>
  );
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn().mockReturnValue([]),
}));
global.fetch = jest.fn();

describe("SearchModal", () => {
  beforeEach(() => {
    global.fetch.mockReset();
    global.fetch.mockImplementation(() =>
      Promise.resolve({ ok: true, json: () => mockManifest })
    );
  });

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

    chooseRover(getByLabelText);
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

    chooseRover(getByLabelText);
    await waitFor(() => {
      const solInput = getByLabelText(/day from landing from 0/i);
      expect(solInput).toBeInTheDocument();
      fireEvent.change(solInput, { target: { value: "54" } });
    });
    const searchBtn = getByText(/search by day/i);
    expect(searchBtn).toBeEnabled();
    fireEvent.click(searchBtn);
    expect(queryByTestId(/form/i)).not.toBeInTheDocument();
  });
});
