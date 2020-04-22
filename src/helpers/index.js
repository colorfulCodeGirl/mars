export const fetchData = async (urlParams) => {
  const apiKey = process.env.REACT_APP_API_CODE;
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/${urlParams}&api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};

export const formateDate = (value, prevValue) => {
  const valueLength = value.length;
  const prevDateLength = prevValue.length;
  const formattedDate =
    (valueLength === 4 && prevDateLength === 3) ||
    (valueLength === 7 && prevDateLength === 6)
      ? `${value}-`
      : value;
  return formattedDate;
};

export const validateDate = (startDate, endDate, value) => {
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  const date = Date.parse(value);
  return date >= start && date <= end && value.length === 10;
};
