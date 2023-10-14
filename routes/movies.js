var express = require('express');
var router = express.Router();
const movieController = require('../controller/peliculas.js');

router.get('/', movieController.get_movies);
router.get('/get_movie/:id', movieController.get_movie)

router.post('/create_movie', movieController.create_movie);

router.put('/edit_movie/:id', movieController.update_movie);

router.delete('/delete_movie/:id', movieController.delete_movie);

module.exports = router;