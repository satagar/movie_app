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

exports.getById = async(req, res) => {
    try {
        const movie = await Movie.findOne({
            _id: req.params.id
        });

        if (!movie) {
            return res.status(404).send({
                message: "Movie Not Found!"
            })
        }
        const response = {
            id: movie._id,
            name: movie.name,
            description: movie.description,
            releaseDate: movie.releaseDate,
            releaseStatus: movie.releaseStatus,
            Director: movie.Director,
            Language: movie.Language,
            poster_URL: movie.poster_URL,
            casts: movie.casts,
            Trailer_URL: movie.Trailer_URL,
            createdat: movie.createdat,
            updatedAt: movie.updatedAt
        }
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error Occured while find by Id"
        })
    }
}

exports.update = async(req, res) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id });

        if (!movie) {
            return res.status(404).send({
                message: "Movie Not Found!"
            });

        }
        if (movie) {
            movie.name = req.body.name != undefined ? req.body.name : movie.name,
                movie.description = req.body.description != undefined ? req.body.description : movie.description,
                movie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : movie.releaseDate,
                movie.releaseStatus = req.body.releaseStatus != undefined ? req.body.releaseStatus : movie.releaseStatus,
                movie.Director = req.body.Director != undefined ? req.body.Director : movie.Director,
                movie.casts = req.body.casts != undefined ? req.body.casts : movie.casts
        }
        // console.log(movie)
        const updatedMovie = await movie.save()

        res.status(200).send(updatedMovie)

    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            message: 'Error Occurred in Updation!'
        })
    }
}

exports.delete = async(req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id });
        if (!movie) {
            return res.status(404).send({
                message: "Movie Not Found!"
            });

        }
        res.status(200).send({
            message: "Deleted Movie Successfully"
        })

    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            message: "Error Occurred in Deletion!"
        })

    }
}