import React from "react";
import { render, getRoles, fireEvent } from "@testing-library/react";
import SearchForm from "../organisms/SearchForm/SearchForm";

describe("Search form component", () => {
  it("renders heading", () => {
    const { getByText } = render(<SearchForm />);
    expect(getByText(/explore/i)).toBeInTheDocument();
  });

  it("renders select element for rovers", () => {
    const { getByLabelText } = render(<SearchForm />);
    expect(getByLabelText(/choose/i)).toBeInTheDocument();
  });
  it("renders search button", () => {
    const { getByText } = render(<SearchForm />);
    const button = getByText(/search/i);
    expect(button).toBeInTheDocument();
    expect(getRoles(button).button).toBeTruthy();
  });
  it("renders 'see latest' button", () => {
    const { getByText } = render(<SearchForm />);
    const button = getByText(/see latest/i);
    expect(button).toBeInTheDocument();
    expect(getRoles(button).button).toBeTruthy();
  });

  it("renders buttons disabled on start", () => {
    const { getByText } = render(<SearchForm />);
    expect(getByText(/search/i)).toBeDisabled();
    expect(getByText(/see latest/i)).toBeDisabled();
  });
  it("enables see latest button when rover is picked", () => {
    const { getByText, getByLabelText } = render(<SearchForm />);
    const select = getByLabelText(/choose rover/i);
    const button = getByText(/see latest/i);
    expect(button).toBeDisabled();
    fireEvent.change(select, { target: { value: "opportunity" } });
    expect(button).toBeEnabled();
  });
  it("doesn't enables search button when only rover is picked", () => {
    const { getByText, getByLabelText } = render(<SearchForm />);
    const select = getByLabelText(/choose rover/i);
    const button = getByText(/search/i);
    expect(button).toBeDisabled();
    fireEvent.change(select, { target: { value: "opportunity" } });
    expect(button).toBeDisabled();
  });
  it("renders radio group component when rover is picked", () => {
    const { getAllByRole, getByLabelText, getAllByLabelText } = render(
      <SearchForm />
    );
    const select = getByLabelText(/choose rover/i);
    fireEvent.change(select, { target: { value: "opportunity" } });
    const radio = getAllByRole(/radio/i);
    expect(radio.length).toBe(2);
    const solRadio = getAllByLabelText(/sol/i);
    const earthDayRadio = getByLabelText(/earth/i);
    expect(solRadio[0]).toBeInTheDocument();
    expect(earthDayRadio).toBeInTheDocument();
  });
  it("renders input element for sol/earth days when rover is picked", () => {
    const { getByLabelText, getByPlaceholderText } = render(<SearchForm />);
    const select = getByLabelText(/choose rover/i);
    fireEvent.change(select, { target: { value: "opportunity" } });
    const selectDay = getByPlaceholderText(/SOL from 0 to/i);
    expect(selectDay).toBeInTheDocument();
  });
  it("changes date input element from sol to Earth days when radio group is changed", () => {
    const { getByLabelText, getByPlaceholderText, getAllByRole } = render(
      <SearchForm />
    );
    const select = getByLabelText(/choose rover/i);
    fireEvent.change(select, { target: { value: "opportunity" } });
    const radioBtns = getAllByRole(/radio/i);
    fireEvent.click(radioBtns[1]);
    expect(radioBtns[0].checked).toBeFalsy();
    expect(radioBtns[1].checked).toBeTruthy();
    const input = getByPlaceholderText(/Date from/i);
    expect(input).toBeInTheDocument();
  });
});
