const MovieService = require("../services/searchService");

const searchMovies = async (req, res) => {
  const query = req.query.query;

  const { error, data } = await MovieService.searchMovies(query);
  
  if (error) {
    console.error("Error:", data);
    return res.status(500).send(data);
  }

  res.status(200).send(data);
}

module.exports = {
  searchMovies,
};
