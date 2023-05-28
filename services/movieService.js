const axios = require('axios');
const config = require("../config/index")

const urlAPI = config.URLAPI
const apiKey = config.APIKEY

const getMovie = async (movieId) => {
    try {
        const response = await axios.get(`${urlAPI}/movie/${movieId}?${apiKey}`);
        return { error: null, data: response.data };
      } catch (error) {
        console.error(error);
        return { error: true, data: error };
      }
}

const getPopularMovies = async (req, res) => {
    try {
      const query = req.query;
      const { error, data } = await MoviesService.getPopular(query);
      if (error) {
        return res.status(500).send(data);
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while fetching popular movies.' });
    }
  };
  
  const getUpcomingMovies = async (req, res) => {
    try {
      const query = req.query;
      const { error, data } = await MoviesService.getUpcoming(query);
      if (error) {
        return res.status(500).send(data);
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while fetching upcoming movies.' });
    }
  };
  
  const getTopRatedMovies = async (req, res) => {
    try {
      const query = req.query;
      const { error, data } = await MoviesService.getTopRated(query);
      if (error) {
        return res.status(500).send(data);
      }
      res.status(200).send(data);
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while fetching top-rated movies.' });
    }
  };

module.exports = {
    getMovie,
    getPopularMovies,
    getUpcomingMovies,
    getTopRatedMovies
}