const api = {
  base: "https://covid19.mathdro.id/api",
};

export const fetchData = async (country) => {
  try {
    let response = await fetch(`${api.base}/${country !== 'Global' ? `countries/${country}` : `` }`);
    response = await response.json();

    const { confirmed, recovered, deaths, lastUpdate } = response;

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const response = await fetch(`${api.base}/daily`);
    const data = await response.json();

    return data.map(({ confirmed, deaths, reportDate: date }) => ({
      confirmed: confirmed.total,
      deaths: deaths.total,
      date,
    }));
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountriesList = async () => {
  try {
    const response = await fetch(`${api.base}/countries`).then((res) =>
      res.json()
    );

    return response.countries.map(({ name }) => name);
  } catch (error) {
    console.log(error);
  }
};
