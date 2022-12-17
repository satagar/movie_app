const Theatre = require('../models/theatre.model');

exports.createTheatre = async (req,res)=>{
    const body= req.body;
    const theatreObj={
        name:body.name,
        description:body.description,
        city:body.city,
        pinCode:body.pinCode,
    }
    try {
        const theatre= await Theatre.create(theatreObj)
        res.status(201).send(theatre);
    } catch (error) {
        res.status(500).send({
            massage:'Error Occured!'
        })
    }
}