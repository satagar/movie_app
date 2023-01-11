const Theatre = require('../models/theatre.model');

exports.validateTheatre=async (req,res,next)=>{
    const body=req.body;
    if(!req.body.name){
        return res.status(400).send({
            massage:"failed! theatre name is not provided"
        })
    }
    if(!req.body.description){
        return res.status(400).send({
            massage:"failed! theatre description is not provided"
        })
    }
    if(!req.body.city){
        return res.status(400).send({
            massage:"failed! theatre city is not provided"
        })
    }
    if(!req.body.pinCode){
        return res.status(400).send({
            massage:"failed! pincode is not provided"
        })
    }else {
        const theatre = await  Theatre.findOne({name:body.name, pinCode:body.pinCode})
        if(theatre){
            return res.status(400).send({
                message: "Theatre is same location  already exists , Bad Request!"
            })
        }
    }
    next()
}