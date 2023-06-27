const axios = require("axios");
const config = require("../config/index");

const urlAPI = config.URLAPI;
const apiKey = config.APIKEY;

const getMovie = async (movieId) => {
  try {
    const response = await axios.get(
      `${urlAPI}/movie/${movieId}?api_key=${apiKey}&language=es-ES`
    );

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Error in getMovie", error);
    return { error: true, data: error };
  }
};

const getSimilarMovies = async (movieId) => {
  try {
    const requestURL = `${urlAPI}/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`;
    const response = await axios.get(requestURL);

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Error in getSimilarMovies", error);
    return { error: true, data: error };
  }
};

const getMovieActors = async (movieId) => {
  try {
    const response = await axios.get(
      `${urlAPI}/movie/${movieId}/credits?api_key=${apiKey}`
    );
    return { error: null, data: response.data.cast };
  } catch (error) {
    console.error(error);
    return { error: true, data: error };
  }
};

const getPopularMovies = async (query) => {
  try {
    const page = query.page || 1;
    const requestURL = `${urlAPI}/movie/popular?api_key=${apiKey}&language=es-ES&page=${page}`;
    const response = await axios.get(requestURL);

    return { error: null, data: response.data };
  } catch (error) {
    console.error("Error in getPopularMovies", error);
    return { error: true, data: error };
  }
};

const getTopRatedMovies = async (query) => {
  try {
    const page = query.page || 1;
    const requestURL = `${urlAPI}/movie/top_rated?api_key=${apiKey}&language=es-ES&page=${page}`;
    const response = await axios.get(requestURL);

    return { error: null, data: response.data };
  } catch (error) {
    console.error(error);
    return { error: true, data: error };
  }
};

const getUpcomingMovies = async (query) => {
  try {
    const page = query.page || 1;
    const requestURL = `${urlAPI}/movie/upcoming?api_key=${apiKey}&language=es-ES&page=${page}`;
    const response = await axios.get(requestURL);

    return { error: null, data: response.data };
  } catch (error) {
    console.error(error);
    return { error: true, data: error };
  }
};

module.exports = {
  getMovie,
  getSimilarMovies,
  getMovieActors,
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
};
