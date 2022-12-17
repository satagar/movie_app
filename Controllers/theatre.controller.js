const Theatre = require("../Models/theatre.model")

exports.theatreCreation = async(req, res) => {
    const theatreObj = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pincode: req.body.pincode,
    }

    try {
        const theatre = await Theatre.create(theatreObj);
        res.status(201).send(theatre)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in theatre creeation"
        })
    }
}

exports.getAlltheatres = async(req, res) => {
    try {
        const theatres = await Theatre.find();
        res.status(200).send(theatres)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in Finding theatres!"
        })
    }
}

exports.getById = async(req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });
        res.status(200).send(theatre)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: " Error in Finding Theatre"
        })
    }
}

exports.getByPincode = async(req, res) => {
    try {
        const theatre = await Theatre.findOne({ pincode: req.query.pincode });
        res.status(200).send(theatre)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: " Error in Finding Theatre"
        })
    }
}

exports.getByCity = async(req, res) => {
    try {
        const theatre = await Theatre.findOne({ city: req.query.city });
        res.status(200).send(theatre)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: " Error in Finding Theatre"
        })
    }
}

exports.update = async(req, res) => {
    try {
        const theatre = await Theatre.findOne({ _id: req.params.id });
        if (theatre) {
            theatre.name = req.body.name != undefined ? req.body.name : theatre.name,
                theatre.description = req.body.description != undefined ? req.body.description : theatre.description,
                theatre.city = req.body.city != undefined ? req.body.city : theatre.city,
                theatre.pincode = req.body.pincode != undefined ? req.body.pincode : theatre.pincode
        }
        updatedTheatre = await theatre.save();
        res.status(200).send(updatedTheatre)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: " Error in Updating Theatre"
        })
    }
}

exports.delete = async(req, res) => {
    try {
        const deleteTheatre = await Theatre.deleteOne({ _id: req.params.id });
        res.status(200).send({
            message: 'Deleted Theatre Details Successfully'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error Occurred in Deletion!"
        })
    }
}