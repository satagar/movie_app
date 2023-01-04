exports.movieValidate = async(req, res, next) => {
    const body = req.body;

    if (!body.name) {
        return res.status(400).send({
            message: " Movie name is required!"
        })
    }

    if (!body.description) {
        return res.status(400).send({
            message: " Movie description is required!"
        })
    }

    if (!body.releaseStatus) {
        return res.status(400).send({
            message: " Movie Release Status is required!"
        })
    }

    const releaseStatus = req.body.releaseStatus;
    const releaseStatusTypes = ["COMMING_SOON", "RELEASED", "POSTPONED"];
    if (!releaseStatusTypes.includes(releaseStatus)) {
        return res.status(400).send({
            message: "Invalid Movie Status Possible values COMMING_SOON|| RELEASED|| POSTPONED "
        })
    }

    if (!body.releaseDate) {
        return res.status(400).send({
            message: " Movie Release Date is required!"
        })
    }

    if (!body.Director) {
        return res.status(400).send({
            message: " Movie Director is required!"
        })
    }
    next();
}