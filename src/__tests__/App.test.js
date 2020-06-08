import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import App from "../App";
import configureStore from "../store/store";
import { latestPhotos } from "../__response__mocks/latestPhotos";
import { photosByQuery } from "../__response__mocks/photosByQuery";
import { mockManifest } from "../__response__mocks/mockManifest";
import { chooseRover } from "../test-helpers";
import Mars from "../components/atoms/Mars";
import MarsSmall from "../components/atoms/MarsSmall";

global.fetch = jest.fn();
jest.mock("../components/atoms/Mars");
Mars.mockImplementation(() => <p>animation</p>);
jest.mock("../components/atoms/MarsSmall");
MarsSmall.mockImplementation(() => <p>animation</p>);
jest.mock("react-lazy-load-image-component", () => ({
  LazyLoadImage: ({ src, key, alt, onClick, ...rest }) => (
    <img
      src={src}
      alt={alt}
      onClick={onClick}
      key={key}
      data-index={rest["data-index"]}
    />
  ),
}));
jest.mock("react-transition-group", () => ({
  Transition: (props) => (props.in ? props.children : null),
}));

const renderApp = () => {
  const store = configureStore();
  const history = createBrowserHistory();
  return render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
};

describe("App component main block", () => {
  beforeEach(() => {
    global.fetch.mockReset();
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => mockManifest })
    );
  });

  it("applies Global style", () => {
    const { container } = renderApp();
    expect(container).toHaveStyle(`
      box-sizing: inherit;
      font-family: inherit;
      margin: 0;
      font-size: 1.6rem;
    `);
  });

  it("it renders Home component with form for default path '/'", () => {
    const { getByTestId } = renderApp();
    expect(getByTestId(/form/i)).toBeInTheDocument();
    const location = global.window.location.pathname;
    expect(location).toBe("/");
  });

  it("fetches latest photos, redirects to '/results', shows Results component with filled form and photos", async () => {
    const {
      getByTestId,
      getByLabelText,
      getByText,
      getAllByAltText,
    } = renderApp();
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
      expect(getByLabelText(/choose rover/i)).toHaveValue("Curiosity");
      expect(
        getAllByAltText(/Mars by rover Curiosity/i)[0]
      ).toBeInTheDocument();
    });
  });

  it("fetches photos by query, redirects to '/results', shows Results component with filled form and photos", async () => {
    const {
      getByTestId,
      getByLabelText,
      getByText,
      getAllByAltText,
    } = renderApp();
    const searchBtn = getByText(/see latest/i);
    chooseRover(getByLabelText);

    await waitFor(() => {
      const solInput = getByLabelText(/day from landing from 0/i);
      expect(solInput).toBeInTheDocument();
      fireEvent.change(getByLabelText(/day from landing from 0/i), {
        target: { value: 54 },
      });
    });

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => photosByQuery })
    );

    await waitFor(() => {
      expect(searchBtn).toBeEnabled();
    });
    fireEvent.click(searchBtn);

    await waitFor(() => {
      expect(getByTestId(/results/i)).toBeInTheDocument();
      const location = global.window.location.pathname;
      expect(location).toBe("/results");
      expect(getByLabelText(/choose rover/i)).toHaveValue("Curiosity");
      expect(getByLabelText(/day from landing from 0/i)).toHaveValue("54");
      expect(
        getAllByAltText(/Mars by rover Curiosity/i)[0]
      ).toBeInTheDocument();
    });
  });
});

describe("App fetch errors", () => {
  beforeEach(() => {
    global.fetch.mockReset();
    global.fetch.mockImplementation(() => new Error("Bad request"));
  });

  const setManifestSuccess = () => {
    global.fetch.mockReset();
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: true, json: () => mockManifest })
    );
  };

  it("show error when fetching manifest fails", async () => {
    const { getByLabelText, getByText } = renderApp();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("show error when fetching photos fails", async () => {
    const { getByLabelText, getByText, queryByText } = renderApp();
    const button = getByText(/see latest/i);
    setManifestSuccess();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(button).toBeEnabled();
      expect(queryByText(/something went wrong/i)).not.toBeInTheDocument();
    });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("allows to close fetch error modal", async () => {
    const { getByLabelText, getByText, queryByText } = renderApp();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
    fireEvent.click(getByLabelText(/close/i));
    expect(queryByText(/something went wrong/i)).not.toBeInTheDocument();
  });

  it("opens fetch error modal, when error was closed and fetching error happened again", async () => {
    const { getByLabelText, getByText, queryByText } = renderApp();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
    fireEvent.click(getByLabelText(/close/i));
    expect(queryByText(/something went wrong/i)).not.toBeInTheDocument();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it("doesn't opens fetch error modal, when error was closed and next fetching was success", async () => {
    const { getByLabelText, getByText, queryByText } = renderApp();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByText(/something went wrong/i)).toBeInTheDocument();
    });
    fireEvent.click(getByLabelText(/close/i));
    expect(queryByText(/something went wrong/i)).not.toBeInTheDocument();
    setManifestSuccess();
    chooseRover(getByLabelText);
    await waitFor(() => {
      expect(getByLabelText(/choose rover/i)).toHaveValue("Curiosity");
      expect(queryByText(/something went wrong/i)).not.toBeInTheDocument();
    });
  });
});
