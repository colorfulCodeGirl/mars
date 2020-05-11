import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import App from "../App";
import configureStore from "../store/store";
import { latestPhotos } from "../__response__mocks/latestPhotos";

const store = configureStore();

const mockManifest = {
  photo_manifest: {
    landing_date: "2004-01-04",
    max_sol: 2208,
    max_date: "2010-03-21",
  },
};

global.fetch = jest.fn();

const renderApp = () => {
  const history = createBrowserHistory();
  return render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

const chooseRover = (getByLabelText) => {
  global.fetch.mockImplementationOnce(() =>
    Promise.resolve({ ok: true, json: () => mockManifest })
  );
  fireEvent.change(getByLabelText(/choose rover/i), {
    target: { value: "Curiosity" },
  });
};

describe("App component", () => {
  it("applies Global style", () => {
    const { container } = renderApp();
    expect(container).toHaveStyle(`
      box-sizing: inherit;
      font-family: inherit;
      margin: 0;
      font-size: 1.6rem;
    `);
  });
  it("applies font Montserrat", () => {});
  it("it renders form on start", () => {
    const { getByTestId } = renderApp();
    expect(getByTestId(/form/i)).toBeInTheDocument();
  });
  it("Shows Home component for a root path", () => {});
  it("Shows Result Component for '/results' path", () => {});
  it("fetches latest photos and redirects to '/results'", async () => {
    const { getByTestId, getByLabelText, getByText } = renderApp();
    const seeLatestBtn = getByText(/see latest/i);
    chooseRover(getByLabelText);

    await waitFor(() => {
      expect(seeLatestBtn).toBeEnabled();
    });

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => latestPhotos })
    );
    fireEvent.click(seeLatestBtn);

    await waitFor(() => {
      expect(getByTestId(/results/i)).toBeInTheDocument();
      const location = global.window.location.pathname;
      expect(location).toBe("/results");
    });
  });
});
