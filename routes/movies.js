const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/:id', movieController.getMovie);
router.get('/popular', movieController.getPopular);
router.get('/upcoming', movieController.getUpcoming);
router.get('/top-rated', movieController.getTopRated);

module.exports = router;
