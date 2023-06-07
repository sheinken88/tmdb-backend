require("dotenv").config();

module.exports = {
  NAME: "tmdb",
  DB_HOST: "tmdb_new",
  PORT: 8080,
  SECRET: "fideos",
  APIKEY: process.env.APIKEY,
  URLAPI: "https://api.themoviedb.org/3",
};
