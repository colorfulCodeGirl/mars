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
});
