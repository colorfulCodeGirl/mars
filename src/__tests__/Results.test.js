import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Results from "../views/Results";
import configureStore from "../store/store";
import { photosByQuery } from "../__response__mocks/photosByQuery";
import { mockManifest } from "../__response__mocks/mockManifest";
import Mars from "../components/atoms/Mars";
import MarsSmall from "../components/atoms/MarsSmall";

jest.mock('../components/atoms/Mars');
Mars.mockImplementation(() => <p>animation</p>);
jest.mock('../components/atoms/MarsSmall');
MarsSmall.mockImplementation(() => <p>animation</p>);

beforeEach(() => {
  localStorage.clear();
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => mockManifest })
    )
    .mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => photosByQuery })
    );
});

const renderResults = (
  path = "/results?rover=Spirit&latest=undefined&sol=35&date="
) => {
  const history = createBrowserHistory();
  history.push(path);
  const store = configureStore();
  return render(
    <Provider store={store}>
      <Router history={history}>
        <Results show={true}/>
      </Router>
    </Provider>
  );
};

describe("Results component", () => {
  it("gets data from url and renders filled form (query by SOL)", async () => {
    const { getByLabelText, getByText } = renderResults(
      "/results?rover=Spirit&latest=undefined&sol=35&date="
    );
    await waitFor(() => {
      expect(getByLabelText(/choose rover/i)).toHaveValue("Spirit");
      expect(getByLabelText(/SOL from 0/i)).toHaveValue("35");
      expect(getByText(/see latest/i)).toBeEnabled();
      expect(getByText(/search/i)).toBeEnabled();
    });
  });
  it("gets data from url and renders filled form (query by Date)", async () => {
    const { getByLabelText, getByText } = renderResults(
      "/results?rover=Curiosity&latest=undefined&sol=&date=2012-08-28"
    );
    await waitFor(() => {
      expect(getByLabelText(/choose rover/i)).toHaveValue("Curiosity");
      expect(getByLabelText(/Date from/i)).toHaveValue("2012-08-28");
      expect(getByText(/see latest/i)).toBeEnabled();
      expect(getByText(/search/i)).toBeEnabled();
    });
  });
  it("gets data from url and renders filled form (query by latest)", async () => {
    const { getByLabelText, getByText } = renderResults(
      "results?rover=Opportunity&latest=true&sol=&date="
    );
    await waitFor(() => {
      expect(getByLabelText(/choose rover/i)).toHaveValue("Opportunity");
      expect(getByLabelText(/SOL from 0/i)).toHaveValue("");
      expect(getByText(/see latest/i)).toBeEnabled();
      expect(getByText(/search/i)).toBeDisabled();
    });
  });
  it("gets data from url and renders gallery with photos", async () => {
    const { getAllByAltText } = renderResults(
      "/results?rover=Spirit&latest=undefined&sol=35&date="
    );
    const rover = photosByQuery.photos[0].rover.name;
    await waitFor(() => {
      expect(getAllByAltText(`Mars by rover ${rover}`)[0]).toBeInTheDocument();
    });
  });
  it("displays form on the left for desktop look", () => {
    const { getByTestId } = renderResults();
    const leftSideStyles = `
    grid-column: auto;
      grid-row: auto;
      justify-self: start;
      align-self: stretch;
      height: 100vh;
      width: 350px;
    `;
    expect(getByTestId(/form/i)).toHaveStyle(leftSideStyles);
  });
  it("should on rover change - clean up form, show animation and doesn't show photos", async () => {
    const { getByLabelText, queryAllByAltText, queryByAltText, getByTestId } = renderResults(
      "/results?rover=Spirit&latest=undefined&sol=35&date="
    );
    const roverSelect = getByLabelText(/choose rover/i);
    await waitFor(() => {
      expect(roverSelect).toHaveValue("Spirit");
      expect(getByLabelText(/SOL from 0/i)).toHaveValue("35");
      expect(queryAllByAltText(/mars by rover/i)[0]).toBeInTheDocument();
    });

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => mockManifest })
    );
    fireEvent.change(roverSelect, { target: { value: "Curiosity" } });
    await waitFor(() => {
      expect(roverSelect).toHaveValue("Curiosity");
      // expect(getByTestId(/mars/i)).toBeInTheDocument();
      expect(getByLabelText(/SOL from 0/i)).not.toHaveValue("35");
      expect(queryByAltText(/mars by rover/i)).not.toBeInTheDocument();
    });
  });
  it("shows 'Change search' button in mobile look for opening search form", async () => {
    const { getByText, queryByTestId } = renderResults();
    window.innerWidth = 375;
    window.innerHeight = 667;
    window.dispatchEvent(new Event("resize"));
    await waitFor(() => {
      expect(getByText(/change search/i)).toBeInTheDocument();
      expect(queryByTestId(/form/i)).not.toBeInTheDocument();
    });
  });
});
