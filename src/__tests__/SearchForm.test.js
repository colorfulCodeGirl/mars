import React from "react";
import { render, getRoles, fireEvent } from "@testing-library/react";
import SearchForm from "../components/organisms/SearchForm";

// const store = {
//   fetchManifest: () => {},
//   handlePeriod: () => {},
//   cleanUpPeriod: () => {},
//   fetchPhotos: () => {},
// };

// const searchForm = () => render(<SearchForm {...store} displayLeft={false} />);

describe("Search form component", () => {
  // it("renders heading", () => {
  //   const { getByText } = searchForm;
  //   expect(getByText(/explore/i)).toBeInTheDocument();
  // });

  // it("renders select element for rovers", () => {
  //   const { getByLabelText } = searchForm;
  //   expect(getByLabelText(/choose/i)).toBeInTheDocument();
  // });
  // it("renders search button", () => {
  //   const { getByText } = searchForm;
  //   const button = getByText(/search/i);
  //   expect(button).toBeInTheDocument();
  //   expect(getRoles(button).button).toBeTruthy();
  // });
  // it("renders 'see latest' button", () => {
  //   const { getByText } = searchForm;
  //   const button = getByText(/see latest/i);
  //   expect(button).toBeInTheDocument();
  //   expect(getRoles(button).button).toBeTruthy();
  // });

  // it("renders buttons disabled on start", () => {
  //   const { getByText } = searchForm;
  //   expect(getByText(/search/i)).toBeDisabled();
  //   expect(getByText(/see latest/i)).toBeDisabled();
  // });
  // it("enables see latest button when rover is picked", () => {
  //   const { getByText, getByLabelText } = searchForm;
  //   const select = getByLabelText(/choose rover/i);
  //   const button = getByText(/see latest/i);
  //   expect(button).toBeDisabled();
  //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   expect(button).toBeEnabled();
  // });
  // it("doesn't enables search button when only rover is picked", () => {
  //   const { getByText, getByLabelText } = searchForm;
  //   const select = getByLabelText(/choose rover/i);
  //   const button = getByText(/search/i);
  //   expect(button).toBeDisabled();
  //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   expect(button).toBeDisabled();
  // });
  // it("renders radio group component when rover is picked", () => {
  //   const { getAllByRole, getByLabelText, getAllByLabelText } = render(
  //     <SearchForm {...store} displayLeft={false} />
  //   );
  //   const select = getByLabelText(/choose rover/i);
  //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   const radio = getAllByRole(/radio/i);
  //   expect(radio.length).toBe(2);
  //   const solRadio = getAllByLabelText(/sol/i);
  //   const earthDayRadio = getByLabelText(/earth/i);
  //   expect(solRadio[0]).toBeInTheDocument();
  //   expect(earthDayRadio).toBeInTheDocument();
  // });
  // it("renders input element for sol/earth days when rover is picked", () => {
  //   const { getByLabelText, getByPlaceholderText } = render(
  //     <SearchForm {...store} displayLeft={false} />
  //   );
  //   const select = getByLabelText(/choose rover/i);
  //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   const selectDay = getByPlaceholderText(/SOL from 0 to/i);
  //   expect(selectDay).toBeInTheDocument();
  // });
  // it("changes date input element from sol to Earth days when radio group is changed", () => {
  //   const { getByLabelText, getByPlaceholderText, getAllByRole } = render(
  //     <SearchForm {...store} displayLeft={false} />
  //   );
  //   const select = getByLabelText(/choose rover/i);
  //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   const radioBtns = getAllByRole(/radio/i);
  //   fireEvent.click(radioBtns[1]);
  //   expect(radioBtns[0].checked).toBeFalsy();
  //   expect(radioBtns[1].checked).toBeTruthy();
  //   const input = getByPlaceholderText(/Date from/i);
  //   expect(input).toBeInTheDocument();
  // });
  // it("shows error when sol/day is incorrect", () => {
  //   const {
  //     getByLabelText,
  //     getByPlaceholderText,
  //     getAllByRole,
  //     getByText,
  //   } = render(<SearchForm {...store} displayLeft={false} />);
  //   const select = getByLabelText(/choose rover/i);
  //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   const radioBtns = getAllByRole(/radio/i);
  //   const inputSol = getByPlaceholderText(/SOL from 0 to/i);

  //   fireEvent.change(inputSol, { target: { value: "k" } });
  //   const errorSOL = getByText(/SOL should be a number from 0/i);
  //   expect(errorSOL).toBeInTheDocument();

  //   fireEvent.change(inputSol, { target: { value: "-1" } });
  //   expect(errorSOL).toBeInTheDocument();

  //   fireEvent.change(inputSol, { target: { value: "10000000" } });
  //   expect(errorSOL).toBeInTheDocument();

  //   fireEvent.click(radioBtns[1]);
  //   const inputDate = getByPlaceholderText(/Date from/i);

  //   fireEvent.change(inputDate, { target: { value: "20k1-02" } });
  //   const errorDate = getByText(/Date should be from/i);
  //   expect(errorDate).toBeInTheDocument();

  //   fireEvent.change(inputDate, { target: { value: "20,1-02-0." } });
  //   expect(errorDate).toBeInTheDocument();

  //   fireEvent.change(inputDate, { target: { value: "2012-02-006" } });
  //   expect(errorDate).toBeInTheDocument();

  //   fireEvent.change(inputDate, { target: { value: "1200-06-03" } });
  //   expect(errorDate).toBeInTheDocument();

  //   fireEvent.change(inputDate, { target: { value: "2050-06-03" } });
  //   expect(errorDate).toBeInTheDocument();
  // });
  // it("enables search button when form is filed", () => {
  //   const { getByLabelText, getByPlaceholderText, getByText } = render(
  //     <SearchForm {...store} displayLeft={false} />
  //   );
  //   const select = getByLabelText(/choose rover/i);
  //   fireEvent.change(select, { target: { value: "opportunity" } });

  //   const button = getByText(/search/i);
  //   expect(button).toBeDisabled();

  //   const inputSol = getByPlaceholderText(/SOL from 0 to/i);
  //   fireEvent.change(inputSol, { target: { value: "0" } });

  //   //wait for validation data from API
  //   setTimeout(() => expect(button).toBeEnabled(), 3000);

  //   fireEvent.change(inputSol, { target: { value: "k" } });

  //   expect(button).toBeDisabled();
  // });

  // it("calls search function", () => {
  //   //   const onSearch = jest.fn();
  //   //   const { getByLabelText, getByPlaceholderText, getByText } = render(
  //   //     <SearchForm {...store} displayLeft={false} handleSearch={onSearch} />
  //   //   );
  //   //   const select = getByLabelText(/choose rover/i);
  //   //   fireEvent.change(select, { target: { value: "opportunity" } });
  //   //   const inputSol = getByPlaceholderText(/SOL from 0 to/i);
  //   //   fireEvent.change(inputSol, { target: { value: "0" } });
  //   //   const button = getByText(/search/i);
  //   //   //wait for validation data from API
  //   //   setTimeout(() => {
  //   //     fireEvent.click(button);
  //   //     expect(onSearch).toBeCalledTimes(1);
  //   //   }, 3000);
  // });

  it("redirects to results when search is fired", () => {});
});
