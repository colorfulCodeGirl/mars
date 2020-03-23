import React from "react";
import { render } from "@testing-library/react";
import SearchForm from "../organisms/SearchForm/SearchForm";

describe("Search form component", () => {
  it("renders heading", () => {
    const { getByText } = render(<SearchForm />);
    expect(getByText(/explore/i)).toBeInTheDocument();
  });
});
