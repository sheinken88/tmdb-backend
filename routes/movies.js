const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

router.get("/popular", movieController.getPopularMovies);
router.get("/top_rated", movieController.getTopRatedMovies);
router.get("/upcoming", movieController.getUpcomingMovies);
router.get("/:movieId", movieController.getMovieDetails);
router.get("/:movieId/credits", movieController.getMovieActors);

module.exports = router;
