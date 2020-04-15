import { validateDate, formateDate } from "../helpers";

describe("validateDate function", () => {
  const mockRange = {
    startDate: "2008-06-07",
    endDate: "2017-09-15",
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

describe("formateDate function", () => {
  it("formate date adding dashes", () => {
    expect(formateDate("2015", "201")).toBe("2015-");
    expect(formateDate("2015-08", "2015-0")).toBe("2015-08-");
    expect(formateDate("2015-0", "2015-")).toBe("2015-0");
    expect(formateDate("201", "20")).toBe("201");
  });

  it("allows to remove dashes", () => {
    expect(formateDate("2015", "2015-")).toBe("2015");
    expect(formateDate("2015-09", "2015-09-")).toBe("2015-09");
  });
});
