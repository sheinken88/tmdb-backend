const MovieService = require("../services/movieService");

const getMovieDetails = async (req, res) => {
  const movieId = req.params.movieId;

  const { error: movieError, data: movieData } = await MovieService.getMovie(
    movieId
  );

  if (movieError) {
    return res.status(500).send(movieData);
  }

  const { error: similarError, data: similarData } =
    await MovieService.getSimilarMovies(movieId);

  if (similarError) {
    return res.status(500).send(similarData);
  }

  res.status(200).send({ movieDetails: movieData, similarMovies: similarData });
};

const getMovieActors = async (req, res) => {
  const movieId = req.params.movieId;
  try {
    const { error, data } = await MovieService.getMovieActors(movieId);

    if (error) {
      return res.status(500).send(data);
    }

    res.send(data);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while fetching actors." });
  }
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
  getMovieActors,
  getPopularMovies,
  getUpcomingMovies,
  getTopRatedMovies,
};
