const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

router.get('/:id', moviesController.getMovie);
router.get('/popular', moviesController.getPopular);
router.get('/upcoming', moviesController.getUpcoming);
router.get('/top-rated', moviesController.getTopRated);

module.exports = router;
