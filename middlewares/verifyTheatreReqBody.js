exports.validateTheatreReqBody = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! Theatre name is not provided!"
        });
    }
    if(!req.body.description){
        return res.status(400).send({
            message: "Failed! Theatre description is not provided!"
        });
    }
    if(!req.body.city){
        return res.status(400).send({
            message: "Failed! Theatre city is not provided!"
        });
    }
    if(!req.body.pincode){
        return res.status(400).send({
            message: "Failed! Theatre pincode is not provided!"
        });
    }
    next();
}