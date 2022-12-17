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
    const condition = {};
    if(req.query.name){
        condition.name = req.query.name;
    }
    try{
        const movies = await Movie.find(condition);
        res.status(200).send(movies);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching movies. Please try again after sometime!"
        });
    }
}

const getMovieById = async (req, res) => {
    try{
        const movie = await Movie.findOne({_id: req.params.id});
        if(!movie){
            return res.sendStatus(404);
        }
        res.status(200).send(movie);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching movie. Please try again after sometime!"
        });
    }
}

const updateMovie = async (req, res) => {
    try{
        let movie = await Movie.findOne({_id: req.params.id});
        if(!movie){
            return res.status(404).send({
                message: "Movie being updated doesn't exist"
            });
        }
        const updateMovieObject = {
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
        const updatedMovie = await Movie.updateOne( {_id: req.params.id}, updateMovieObject);
        res.status(200).send(updatedMovie);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in updating movie. Please try again after sometime!"
        });
    }
}

const deleteMovie = async (req, res) => {
    try{
        await Movie.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: `Successfully delete movie with id ${req.params.id}`
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in deletion. Please try again after sometime!"
        });
    }
}

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    updateMovie,
    deleteMovie
}