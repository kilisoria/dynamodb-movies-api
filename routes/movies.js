const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/movies.js');

router.route('/').get(moviesController.getMovies);
router.route('/:id').get(moviesController.getMovie);
router.route('/:id').delete(moviesController.deleteMovie);
router.route('/').post(moviesController.addMovie);

module.exports = router;