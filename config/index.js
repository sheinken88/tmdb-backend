require("dotenv-flow").config();

module.exports = {
  NAME: "tmdb",
  PORT: process.env.PORT || 8081,
  SECRET: process.env.SECRET,
  APIKEY: process.env.APIKEY,
  URLAPI: "https://api.themoviedb.org/3",
};
