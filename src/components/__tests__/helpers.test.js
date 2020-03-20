import { validateDate, formateDate } from "../../helpers";

describe("Validate date function", () => {
  const mockRange = {
    startDate: "2008-06-07",
    endDate: "2017-09-15"
  };

  it("checks if the date is in a range", () => {
    expect(validateDate(mockRange, "2015-07-09")).toBeTruthy();

    expect(validateDate(mockRange, "2015-07-")).toBeFalsy();

    expect(validateDate(mockRange, "201k-07-kl")).toBeFalsy();

    expect(validateDate(mockRange, "-&?k-07-kl")).toBeFalsy();

    expect(validateDate(mockRange, "2015-07-006")).toBeFalsy();

    expect(validateDate(mockRange, "2019-07-09")).toBeFalsy();
  });
});
