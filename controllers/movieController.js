const MovieService = require("../services/movieService");

const getMovieDetails = async (req, res) => {
  const movieId = req.params.movieId;

  const { error, data } = await MovieService.getMovie(movieId);

  if (error) {
    return res.status(500).send(data);
  }

  res.status(200).send(data);
};

const getPopularMovies = async (req, res) => {
  try {
    const q = req.query;
    const page = Number(q.page) || 1;

    const { error, data } = await MovieService.getPopularMovies({ ...q, page });
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching popular movies." });
  }
};

const getUpcomingMovies = async (req, res) => {
  try {
    const q = req.query;
    const page = Number(q.page) || 1;
    const { error, data } = await MovieService.getUpcomingMovies({
      ...q,
      page,
    });
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching upcoming movies." });
  }
};

const getTopRatedMovies = async (req, res) => {
  try {
    const q = req.query;
    const page = Number(q.page) || 1;
    const { error, data } = await MovieService.getTopRatedMovies({
      ...q,
      page,
    });
    if (error) {
      return res.status(500).send(data);
    }
    res.status(200).send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching top-rated movies." });
  }
};

module.exports = {
  getMovieDetails,
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
};
