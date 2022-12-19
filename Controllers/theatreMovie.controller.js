const Theatre = require("../Models/theatre.model");

exports.addMovieToTheatre = async(req, res) => {
    try {
        const theatre = await Theatre({ id: req.params.id });

        const movieIds = req.body.movieIds;

        if (req.body.insert) {
            movieIds.forEach(movieId => {
                theatre.movies.push(movieId)
            });
        }
        res.status(200).send(theatre)

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Adding Movies"
        })
    }
}