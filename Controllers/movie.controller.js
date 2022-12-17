const Movie = require("../Models/movie.model");

exports.movieCreation = async(req, res) => {
    const movieObj = {
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus,
        poster_URL: req.body.poster_URL,
        Trailer_URL: req.body.Trailer_URL,
        Director: req.body.Director,
        Language: req.body.Language,
        casts: req.body.casts
    }

    try {
        const movie = await Movie.create(movieObj);
        res.status(201).send(movie)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in Movie creeation"
        })
    }
}

exports.getAllMovies = async(req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).send(movies)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Finding Movies!"
        })
    }
}