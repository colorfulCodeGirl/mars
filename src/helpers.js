export const fetchData = async urlParams => {
  const apiKey = process.env.REACT_APP_API_CODE;
  const response = await fetch(
    `https://api.nasa.gov/mars-photos/api/v1/${urlParams}&api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
};
