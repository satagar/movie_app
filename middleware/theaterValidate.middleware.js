const THEATER = require('../models/theater.model')
exports.theaterReqBodyValidate =async (req, res, next) => {
    const body = req.body
    if (!body.name) {
        return res.status(400).send({
            message: "Name is required , Bad Request!"
        })
    }
    if (!body.description) {
        return res.status(400).send({
            message: "Description is required , Bad Request!"
        })
    }
    if (!body.city) {
        return res.status(400).send({
            message: "City is required , Bad Request!"
        })
    }
    if (!body.pincode) {
        return res.status(400).send({
            message: "Pincode is required , Bad Request!"
        })
    }else {
        const theater = await THEATER.findOne({name:body.name,pincode:body.pincode})
        if(theater){
            return res.status(400).send({
                message: "Theater is same location  already exists , Bad Request!"
            })
        }
    }
    next()
}