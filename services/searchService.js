const axios = require('axios');
const config = require("../config/index")

const urlAPI = config.URLAPI
const apiKey = config.APIKEY



const searchMovies = async (query) => { 
  try {
    const response = await axios.get(
      `${urlAPI}/search/movie?${apiKey}&query=${query}&page=1`
    );

    return { error: null, data: response.data.results };

  } catch (error) {
    console.error("Axios error: ", error);
    return { error: true, data: error };
  }
};

module.exports = {

  searchMovies,
};

