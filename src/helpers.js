export const fetchData = async urlParams => {
  const apiKey = process.env.REACT_APP_API_CODE;
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/${urlParams}&api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};

export const validateDate = (valData, value) => {
  const { startDate, endDate } = valData;
  const start = Date.parse(startDate);
  const end = Date.parse(endDate);
  const date = Date.parse(value);
  return date >= start && date <= end && value.length === 10;
};
