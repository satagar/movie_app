const moviesModel = require('../models/movies.model')
const theatreModel = require('../models/theatre.model')
const constants = require('../constants/constants')

exports.createTheatre = async (req, res) => {
    const addTheatre = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pincode: req.body.pincode
    }
    const newtheatre = await theatreModel.create(addTheatre)
    return res.status(201).send(newtheatre)
}

exports.getAllTheatres = async (req, res) => {
    const findTheatres = {}
    if (req.query.name != undefined) {
        findTheatres.name = req.query.name
    }
    if (req.query.city != undefined) {
        findTheatres.city = req.query.city
    }
    if (req.query.pincode != undefined) {
        findTheatres.pincode = req.query.pincode
    }
    const foundTheatres = await theatreModel.find(findTheatres)
    if (req.query.movieId != undefined) {
        // filter the list of theatres
        foundTheatres = theatreModel.filter(t => t.movies.includes(req.query.movieId))
    }
    return res.status(200).send(foundTheatres)
}

exports.getTheatre = async (req, res) => {
    const theatre = await theatreModel.findOne({ theatreId: req.params.theatreId })
    return res.status(200).send(theatre)
}

exports.updateTheatre = async (req, res) => {
    const savedTheatre = await theatreModel.findOne({ theatreId: req.params.theatreId })
    if (!savedTheatre) {
        return res.status(400).send({
            message: " Theatre with this name doesn't exist!"
        })
    }
    if (req.body.name != undefined) {
        savedTheatre = req.body.name
    } else {
        savedTheatre = savedTheatre.name
    }
    if (req.body.description != undefined) {
        savedTheatre = req.body.description
    } else {
        savedTheatre = savedTheatre.description
    }
    if (req.body.city != undefined) {
        savedTheatre = req.body.city
    } else {
        savedTheatre = savedTheatre.city
    }
    if (req.body.pincode != undefined) {
        savedTheatre = req.body.pincode
    } else {
        savedTheatre = savedTheatre.pincode
    }
    const updatedTheatre = await savedTheatre.save()
    return res.status(200).send(updatedTheatre)
}

exports.deleteTheatre = async (req, res) => {
    const deletedTheatre = await theatreModel.deleteOne({ _id: req.params._id })
    return res.status(200).send({
        message: "Deleted the theatre ${deletedTheatre}"
    })
}

exports.addMoviesToATheater = async (req, res) => {
    const existingTheatre = await theatreModel.findOne({ theatreId: req.params.theatreId })
    const movieIds = req.body.movieIds
    //Add movie ids to the theatre
    if (req.body.insert) {
        movieIds.forEach(movieId => {
            existingTheatre.movies.push(movieId)
        });
    } else {
        const existingMovieIds = existingTheatre.movies
        movieIds.forEach(movieId => {
            existingMovieIds = existingMovieIds.filter(smi => smi != movieId)
        })
        existingTheatre.movies = existingMovieIds
    }
    await existingTheatre.save()
    res.status(200).send(existingTheatre)
}

exports.checkMovieInsideATheatre = async (req, res) => {
    const existingTheatre = await theatreModel.findOne({ theatreId: req.params.theatreId })
    const existingMovieIds = await moviesModel.findOne({ movieId: req.params.movieId })


    const responseBody = {
        message: existingTheatre.movies.includes(existingMovieIds.movieId) ? "Movie is present" : "Movie is not present"
    }
    res.status(200).send(responseBody)
}