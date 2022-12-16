const { isObjectId, handleServerErrorResponse, handleNotFoundResponse, handleBadRequestResponse } = require("../helpers");
const { User } = require("../models");

const index = async (req, res) => {
    const items = await User.find().catch(error => handleServerErrorResponse(res, error));
    if(items) res.status(200).json(items);
}

const create = async (req, res) => {
    const data = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role || undefined,
        isEnabled: req.body.isEnabled || undefined
    }).catch(error => handleServerErrorResponse(res, error));
    if(data) res.status(201).json(data);
}

const read = async (req, res) => {
    if(!isObjectId(req.params.id)) return handleNotFoundResponse(res, 'Invalid ID');
    const data = await User.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) res.status(200).json(data);
    else handleNotFoundResponse(res);
}

const update = async (req, res) => {
    if(!isObjectId(req.params.id)) handleNotFoundResponse(res, 'Invalid ID');
    const data = await User.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
    if(data) {
        if(req.body.name) data.name = req.body.name;
        if(req.body.password) data.password = req.body.password;
        if(req.body.email) data.email = req.body.email;
        if(req.body.isEnabled) data.isEnabled = req.body.isEnabled;
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
    if(req.params.id === req.user.id) return handleBadRequestResponse(res, 'Cannot delete Self');
    const data = await User.findById(req.params.id).catch(error => handleServerErrorResponse(res, error));
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