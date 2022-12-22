const Theatre = require("../Models/theatre.model");
const Movie = require("../Models/movie.model")

exports.addMovieToTheatre = async(req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });
        const insert = req.body.insert
        const movieIds = req.body.movieIds;

        if (insert) {
            movieIds.forEach(movieId => {
                theatre.movies.push(movieId)
            });
        } else {
            // movieIds.forEach(movieId => {
            theatre.movies.filter(id => { id != movieIds })
                //})
        }
        await theatre.save();
        res.status(200).send(theatre)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Adding Movies"
        })
    }
}

exports.findTheatreByMovies = async(req, res) => {
    const movieId = req.query.movieId;
    if (!movieId) {
        return res.status(404).send({
            message: 'Invalid Id'
        })
    }
    try {
        const theatre = await Theatre.find({ movies: movieId });
        if (!theatre) {
            return res.status(404).send({
                message: 'No Theatre Found!'
            })
        }

        if (movieId) {
            theatre = theatre.filter(t => { t.movies.includes(movieId) })
        }

        res.status(200).send(theatre)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occrred in Finding Theatre"
        })
    }
}

exports.getAllTheatres = async(req, res) => {
    const queryObj = {};

    if (req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    if (req.query.city != undefined) {
        queryObj.city = req.query.city;
    }
    if (req.query.pinCode != undefined) {
        queryObj.pinCode = req.query.pinCode;
    }
    try {
        var theatres = await Theatre.find(queryObj);

        if (req.query.movieId) {

            theatres = theatres.filter(t => t.movies.includes(req.query.movieId));
        }
        res.status(200).send(theatres);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occured In Finding Movie Running"
        })

    }
}

exports.checkMovieInsideATheatre = async(req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.theatreId });
        const movie = await Movie.findOne({ _id: req.params.movieId });

        if (!(theatre || movie)) {
            return res.status(404).send({
                message: "Not found"
            })
        }

        const result = {
            message: theatre.movies.includes(movie._id) ? "Movie is present Running" : "Movie not present"
        }
        res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({
            message: "error in Finding movies"
        })
    }

}