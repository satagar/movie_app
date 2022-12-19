const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { Theater } = require("../models");

const index = async (req, res) => {
    let query = {};
    if(req.query.name) query.name = { '$regex': req.query.name, '$options': 'i' };
    if(req.query.city) query.city = { '$regex': req.query.city, '$options': 'i' };
    if(req.query.pincode) query.pincode = req.query.pincode;
    const items = await Theater.find(query).catch(error => handleServerErrorResponse(res, error));
    if(items) res.status(200).json(items);
}

const create = async (req, res) => {
    const data = await Theater.create({
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pincode: req.body.pincode,
        address: req.body.address,
        coordinates: req.body.coordinates,
        facilities: req.body.facilities,
        refundsEnabled: req.body.refundsEnabled,
        owner: req.user.id,
    }).catch(error => handleServerErrorResponse(res, error));
    if(data) res.status(201).json(data);
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const data = await Theater.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) res.status(200).json(data);
    else handleNotFoundResponse(res);
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const data = await Theater.findOne({ _id: req.params.id, owner: req.user.id }).catch(error => handleServerErrorResponse(res, error));
    if(data) {
        if(req.body.name) data.name = req.body.name;
        if(req.body.description) data.description = req.body.description;
        if(req.body.city) data.city = req.body.city;
        if(req.body.pincode) data.pincode = req.body.pincode;
        if(req.body.address) data.address = req.body.address;
        if(req.body.coordinates) data.coordinates = req.body.coordinates;
        if(req.body.facilities) data.facilities = req.body.facilities;
        if(req.body.refundsEnabled) data.refundsEnabled = req.body.refundsEnabled;
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
    const data = await Theater.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) {
        const deleted = data.deleteOne({ _id: req.params.id }).catch(error => handleServerErrorResponse(res, error));
        if(deleted) res.status(200).json(data);
    }
    else handleNotFoundResponse(res);
}

const setMovies = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const data = await Theater.findOne({ _id: req.params.id, owner: req.user.id }).catch(error => handleServerErrorResponse(res, error));
    if(data) {
        if(req.body.insert) data.addMovies(req.body.movieIds);
        else data.removeMovies(req.body.movieIds);
        if(data.isModified()) {
            const saved = await data.save().catch(error => handleServerErrorResponse(res, error));
            if(saved) res.status(200).json(data);
        }
        else res.status(200).json(data);
    }
    else handleNotFoundResponse(res);
}

module.exports = {
    index,
    create,
    read,
    update,
    destroy,
    setMovies
}