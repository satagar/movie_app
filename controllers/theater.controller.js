const THEATER = require('../models/theater.model');
exports.createTheater = async (req,res)=>{
    const body = req.body;
    const reqData = {
        name:body.name,
        description:body.description,
        city:body.city,
        pincode:body.pincode
    }
    try {
           const theater = await THEATER.create(reqData)
           return res.status(201).send({
            message:"Theater created successfully!"
           })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}