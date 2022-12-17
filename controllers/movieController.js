
const Movie = require('../models/movie.model')


exports.createMovie = async (req, res) => {
    const body = req.body;


    const movieObj = {
        name : body.name,
        description : body.description,
        casts : body.casts,
        director : body.director,
        releaseDate : body.releaseDate,
        releaseStatus : body.releaseStatus,
        language : body.language,
        posterUrl : body.posterUrl,
        trailerUrl : body.trailerUrl
    }
    try {
        console.log(`Movie created successfully!`)
        const movie = await Movie.create(movieObj);
        res.status(201).send(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`
        });
    }
}


exports.deleteMovie = async (req, res) => {
    const reqName = req.params.name;
    
    try {
        console.log('movie deleted successfully')
        const movie = await  Movie.deleteOne({name: reqName})
        res.status(200).send({
            message : `movie deleted successfully`
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`
        });
    }
}


exports.getMovie = async (req, res) => {
    const reqName = req.params.name;

    try {
        console.log('movie fetched successfully!');
        const movie = await Movie.findOne({name : reqName})
        res.status(200).send(movie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}

exports.updateMovie = async (req, res) => {
    const body = req.body;

    try {
        const movieInDb = await Movie.findOne({name : body.name})
        if(!movieInDb) {
            res.status(400).send({
                message : `Something wrong with the update data!`
            })
        }

        movieInDb.name = body.name != undefined ? body.name : movieInDb.name
        movieInDb.description = body.description != undefined ? body.description : movieInDb.description
        movieInDb.casts = body.casts != undefined ? body.casts : movieInDb.casts
        movieInDb.releaseDate = body.releaseDate != undefined ? body.releaseDate : movieInDb.releaseDate
        movieInDb.releaseStatus = body.releaseStatus != undefined ? body.releaseStatus : movieInDb.releaseStatus
        movieInDb.director = body.director != undefined ? body.director : movieInDb.director
        movieInDb.language = body.language != undefined ? body.language : movieInDb.language
        movieInDb.posterUrl = body.posterUrl != undefined ? body.posterUrl : movieInDb.posterUrl
        movieInDb.trailerUrl = body.trailerUrl != undefined ? body.trailerUrl : movieInDb.trailerUrl

        const updatedMovie = await movieInDb.save();
        res.status(200).send(updatedMovie);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}