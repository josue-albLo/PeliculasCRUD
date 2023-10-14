const conection = require('../db/database.js');
const movie = require('../models/Peliculas.js');

conection.conection();

exports.get_movies = async function (req, res, next) {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'No request body found' });
        }

        const movies = await movie.find();
        return res.render('index', { movies: movies })
    } catch (err) {
        console.error('Error finding movies:', err);
        return res.status(500).json({ error: 'There was a problem finding the movies.' });
    }
};

exports.create_movie = async function (req, res, next) {
    try {
        if (!req.body) {
            return res.status(400).send({ message: 'Content can not be empty!' });
        }

        const newMovie = new movie({
            "title": req.body.title,
            "releaseYear": req.body.releaseYear,
            "genre": req.body.genre,
            "director": req.body.director,
            "actors": req.body.actors,
            "plot": req.body.plot,
            "rating": req.body.rating
        });

        const savedMovie = await newMovie.save();
        const allmovies = await movie.find();
        res.render('index', {movies: allmovies });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'There was a problem adding the information to the database.' });
    }
}


exports.update_movie = async function (req, res, next) {
    try {
        if (!req.body) {
            res.status(404).send({ message: 'Data to update can not be empty!' });
        }

        await movie.findByIdAndUpdate(req.params.id, req.body,
            { useFindAndModify: false }).then(data => {
                if (!data) {
                    res.status(404).send({ message: 'Cannot update movie with id=' + req.body.id + '. Maybe movie was not found!' });
                }
                else {
                    res.send({
                        message: "Movie was updated successfully!",
                        data: data
                    })
                }
            })

    } catch (err) {
        res.status(500).send('There was a problem updating the movie.');
        console.log(err);
    }
}

exports.delete_movie = async function (req, res, next) {
    try {
        const movieId = req.params.id;

        const deletedMovie = await movie.findByIdAndRemove(movieId);

        if (!deletedMovie) {
            return res.status(404).json({ message: `Movie with ID ${movieId} not found. Unable to delete.` });
        }

        return res.send({ message: `Movie with ID ${movieId} deleted successfully!` })
    } catch (err) {
        console.error('Error deleting movie:', err);
        return res.status(500).json({ message: `Could not delete movie with ID ${req.params.id}.` });
    }
};

exports.get_movie = async function (req, res, next) {
    try{
        id = req.params.id;
    const updateMovie = await movie.findById(id);
    res.status(200).json(updateMovie);
    }catch(err){
        console.log(err);
        res.status(500).send({ message: 'There was a problem finding the movie.' });
    }
}