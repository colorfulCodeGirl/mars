import { validateDate, formateDate, fetchData } from "../helpers";

describe("validateDate function", () => {
  const startDate = "2008-06-07";
  const endDate = "2017-09-15";

  it("checks if the date is in a range", () => {
    expect(validateDate(startDate, endDate, "2015-07-09")).toBeTruthy();

    expect(validateDate(startDate, endDate, "2015-07-")).toBeFalsy();

    expect(validateDate(startDate, endDate, "201k-07-kl")).toBeFalsy();

    expect(validateDate(startDate, endDate, "-&?k-07-kl")).toBeFalsy();

    expect(validateDate(startDate, endDate, "2015-07-006")).toBeFalsy();

    expect(validateDate(startDate, endDate, "2019-07-09")).toBeFalsy();
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

describe("fetchData function", () => {
  it("fetches data with correct url", async () => {
    const mockData = { rover: "Curiosity" };
    const mockUrlParams = "curiosity";
    const apiKey = process.env.REACT_APP_API_CODE;
    global.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ ok: true, json: () => mockData })
      );

    const response = await fetchData(mockUrlParams);
    expect(response).toEqual(mockData);
    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith(
      `https://api.nasa.gov/mars-photos/api/v1/${mockUrlParams}&api_key=${apiKey}`
    );
  });
});
