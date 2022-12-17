const Threatre = require('../models/threatre.model');

const createThreatre = async (req, res) => {
    const threatreObject = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pincode: req.body.pincode
    }
    try{
        const threatre = await Threatre.create(threatreObject);
        res.status(201).send(threatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in creating threatre. Please try again after sometime!"
        });
    }
}

const getAllThreatres = async (req, res) => {
    const condition = {};
    if(req.query.name){
        condition.name = req.query.name;
    }
    if(req.query.city){
        condition.city = req.query.city;
    }
    if(req.query.pincode){
        condition.pincode = req.query.pincode;
    }
    try{
        const threatres = await Threatre.find(condition);
        res.status(200).send(threatres);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching threatres. Please try again after sometime!"
        });
    }
}

const getThreatreById = async (req, res) => {
    try{
        const threatre = await Threatre.findOne({_id: req.params.id});
        if(!threatre){
            return res.sendStatus(404);
        }
        res.status(200).send(threatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching threatre. Please try again after sometime!"
        });
    }
}

const updateThreatre = async (req, res) => {
    try{
        let threatre = await Threatre.findOne({_id: req.params.id});
        if(!threatre){
            return res.status(404).send({
                message: "Threatre being updated doesn't exist"
            });
        }
        const updateThreatreObject = {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            pincode: req.body.pincode
        }
        const updatedThreatre = await Threatre.updateOne( {_id: req.params.id}, updateThreatreObject);
        res.status(200).send(updatedThreatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in updating threatre. Please try again after sometime!"
        });
    }
}

const deleteThreatre = async (req, res) => {
    try{
        await Threatre.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: `Successfully delete threatre with id ${req.params.id}`
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in deletion. Please try again after sometime!"
        });
    }
}

module.exports = {
    createThreatre,
    getAllThreatres,
    getThreatreById,
    updateThreatre,
    deleteThreatre
}