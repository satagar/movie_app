const THEATER = require('../models/theater.model')
exports.theaterReqBodyValidate = (req,res,next)=>{
    const body = req.body
    if(!body.name){
        return res.status(400).send({
            message:"Name is required!"
        })
    }
    if(!body.description){
        return res.status(400).send({
            message:"Description is required!"
        })
    }
    if(!body.city){
        return res.status(400).send({
            message:"City is required!"
        })
    }
    if(!body.pincode){
        return res.status(400).send({
            message:"Pincode is required!"
        })
    }
    next()
}