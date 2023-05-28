const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/:id', movieController.getMovieDetails);
router.get('/popular', movieController.getPopularMovies);
router.get('/upcoming', movieController.getUpcomingMovies);
router.get('/top-rated', movieController.getTopRatedMovies);

module.exports = router;
