exports.movieValidate = async(req, res, next) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).send({
            message: " Theatre name is required!"
        })
    }

    if (!body.description) {
        return res.status(400).send({
            message: " Theatre description is required!"
        })
    }

    if (!body.city) {
        return res.status(400).send({
            message: " Theatre city is required!"
        })
    }


    if (!body.pincode) {
        return res.status(400).send({
            message: " Theatre pincode is required!"
        })
    }

    next();
}