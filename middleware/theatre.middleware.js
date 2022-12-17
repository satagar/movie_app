exports.validateTheatre=(req,res,next)=>{
    if(!req.body.name){
        return res.sattus(400).send({
            massage:"failed! theatre name is not provided"
        })
    }
    if(!req.body.description){
        return res.sattus(400).send({
            massage:"failed! theatre description is not provided"
        })
    }
    if(!req.body.city){
        return res.sattus(400).send({
            massage:"failed! theatre city is not provided"
        })
    }
    if(!req.body.pinCode){
        return res.sattus(400).send({
            massage:"failed! pincode is not provided"
        })
    }
}