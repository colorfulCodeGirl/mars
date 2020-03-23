import React from "react";
import { render, getRoles } from "@testing-library/react";
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

  it("renders button disabled on start", () => {
    const { getByText } = render(<SearchForm />);
    expect(getByText(/search/i)).toBeDisabled();
  });
});
