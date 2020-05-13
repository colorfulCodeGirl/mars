import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import Results from "../views/Results";
import configureStore from "../store/store";
import { photosByQuery } from "../__response__mocks/photosByQuery";

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
        <Results />
      </Router>
    </Provider>
  );
};

const mockManifest = {
  photo_manifest: {
    landing_date: "2004-01-04",
    max_sol: 2208,
    max_date: "2010-03-21",
  },
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
  // it("gets data from url and renders filled form (query by latest)", async () => {
  //   const { getByLabelText, getByText } = renderResults(
  //     "/results?rover=Spirit&latest=undefined&sol=35&date="
  //   );
  //   await waitFor(() => {
  //     expect(getByLabelText(/choose rover/i)).toHaveValue("Spirit");
  //     expect(getByLabelText(/SOL from 0/i)).toHaveValue("35");
  //     expect(getByText(/see latest/i)).toBeEnabled();
  //     expect(getByText(/search/i)).toBeEnabled();
  //   });
  // });
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
  it("should on rover change - clean up form, show animation, show new photos", async () => {
    // const { getByLabelText, getByText, container } = renderResults(
    //   "/results?rover=Spirit&latest=undefined&sol=35&date="
    // );
    // const roverSelect = getByLabelText(/choose rover/i);
    // await waitFor(() => {
    //   expect(roverSelect).toHaveValue("Spirit");
    //   expect(getByLabelText(/SOL from 0/i)).toHaveValue("35");
    // });
    // // userEvent.selectOptions(roverSelect, ["Curiosity"]);
    // // console.log(prettyDOM(container));
    // // expect(getByText(/curiosity/i).selected).toBe(true);
    // // fireEvent.click(roverSelect);
    // // fireEvent.click(getByText(/curiosity/i));
    // fireEvent.change(roverSelect, { target: { value: "Curiosity" } });
    // await waitFor(() => {
    //   expect(getByLabelText(/SOL from 0/i)).not.toHaveValue("35");
    // });
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
