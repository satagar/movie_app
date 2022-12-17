exports.validateThreatreReqBody = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! Threatre name is not provided!"
        });
    }
    if(!req.body.description){
        return res.status(400).send({
            message: "Failed! Threatre description is not provided!"
        });
    }
    if(!req.body.city){
        return res.status(400).send({
            message: "Failed! Threatre city is not provided!"
        });
    }
    if(!req.body.pincode){
        return res.status(400).send({
            message: "Failed! Threatre pincode is not provided!"
        });
    }
    next();
}