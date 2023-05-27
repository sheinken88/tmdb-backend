const MovieService = require("../services/movieService");

const searchMovies = async (req, res) => {
  const query = req.query.query;
  console.log(req.query)

  const { error, data } = await MovieService.searchMovies(query);
  
  if (error) {
    return res.status(500).send(data);
  }

  res.status(200).send(data);
}

module.exports = {
  searchMovies,
};
