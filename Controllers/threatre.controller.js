const Theatre = require("../Models/theatre");

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