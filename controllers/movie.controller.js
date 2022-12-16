const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Movie } = require("../models");

const index = async (req, res) => {
    let query = {};
    if(req.query.title) query.name = { '$regex': req.query.title, '$options': 'i' };
    const items = await Movie.find(query).catch(error => handleServerErrorResponse(res, error));
    if(items) res.status(200).json(items);
}

const create = async (req, res) => {
    const data = await Movie.create({
        title: req.body.title,
        about: req.body.about,
        posterUrl: req.body.posterUrl,
        trailerUrl: req.body.trailerUrl,
        runtime: req.body.runtime,
        cbfcCertification: req.body.cbfcCertification,
        releaseDate: req.body.releaseDate,
        status: req.body.status,
        genres: req.body.genres,
        directors: req.body.directors,
        writers: req.body.writers,
        cast: req.body.cast
    }).catch(error => handleServerErrorResponse(res, error));
    if(data) res.status(201).json(data);
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const data = await Movie.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) res.status(200).json(data);
    else handleNotFoundResponse(res);
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const data = await Movie.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) {
        if(req.body.title) data.title = req.body.title;
        if(req.body.about) data.about = req.body.about;
        if(req.body.posterUrl) data.posterUrl = req.body.posterUrl;
        if(req.body.trailerUrl) data.trailerUrl = req.body.trailerUrl;
        if(req.body.runtime) data.runtime = req.body.runtime;
        if(req.body.cbfcCertification) data.cbfcCertification = req.body.cbfcCertification;
        if(req.body.releaseDate) data.releaseDate = req.body.releaseDate;
        if(req.body.status) data.status = req.body.status;
        if(req.body.genres) data.genres = req.body.genres;
        if(req.body.directors) data.directors = req.body.directors;
        if(req.body.writers) data.writers = req.body.writers;
        if(data.isModified()) {
            const saved = await data.save().catch(error => handleServerErrorResponse(res, error));
            if(saved) res.status(200).json(data);
        }
        else res.status(200).json(data);
    }
    else handleNotFoundResponse(res);
}

const destroy = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const data = await Movie.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) {
        const deleted = data.deleteOne({ _id: req.params.id }).catch(error => handleServerErrorResponse(res, error));
        if(deleted) res.status(200).json(data);
    }
    else handleNotFoundResponse(res);
}

module.exports = {
    index,
    create,
    read,
    update,
    destroy
}