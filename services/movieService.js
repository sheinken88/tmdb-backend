const axios = require("axios");
const config = require("../config/index")

const urlAPI = config.URLAPI
const apiKey = config.APIKEY

const getMovie = async (movieId) => {
    try {
        const response = await axios.get(`${urlAPI}/movie/${movieId}?${apiKey}&language=es-ES`);
        return { error: null, data: response.data };
      } catch (error) {
        console.error(error);
        return { error: true, data: error };
      }
}
const getPopularMovies = async (query) => {
  try {
    const response = await axios.get(`${urlAPI}/movie/popular?${apiKey}&language=es-ES`);
    return { error: null, data: response.data };
  } catch (error) {
    console.error("Error in getPopularMovies", error);
    return { error: true, data: error };
  }
}

const getTopRatedMovies = async (query) => {
  try {
    const response = await axios.get(`${urlAPI}/movie/top_rated?${apiKey}&language=es-ES`);
    return { error: null, data: response.data };
  } catch (error) {
    console.error(error);
    return { error: true, data: error };
  }
}

const getUpcomingMovies = async (query) => {
  try {
    const response = await axios.get(`${urlAPI}/movie/upcoming?${apiKey}&language=es-ES`);
    return { error: null, data: response.data };
  } catch (error) {
    console.error(error);
    return { error: true, data: error };
  }
}




module.exports = {
    getMovie,
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies
}