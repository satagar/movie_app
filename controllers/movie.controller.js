const Movie = require('../models/movie.model');

const createMovie = async (req, res) => {
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus,
        director: req.body.director,
        language: req.body.language,
        posterUrl: req.body.posterUrl,
        casts: req.body.casts,
        trailerUrl: req.body.trailerUrl
    }
    try{
        const movie = await Movie.create(movieObject);
        res.status(201).send(movie);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in creating movie. Please try again after somtime!"
        });
    }
}

const getAllMovies = async (req, res) => {
    try{
        const movies = await Movie.find();
        res.status(200).send(movies);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching movies. Please try again after somtime!"
        });
    }
}

module.exports = {
    createMovie,
    getAllMovies
}