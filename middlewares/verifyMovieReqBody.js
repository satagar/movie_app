const { releaseStatus } = require("../utils/constants");

exports.validateMovieReqBody = (req, res, next) => {
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! Movie name is not provided!"
        });
    }
    if(!(req.body.releaseStatus)){
        return res.status(400).send({
            message: "Failed! Movie release status is not provided!"
        });
    }
    if(!releaseStatus.includes(req.body.releaseStatus)){
        return res.status(400).send({
            message: "Failed! Movie release status is invalid. Possible values UNRELEASED | RELEASED | BLOCKED"
        });
    }
    if(!req.body.releaseDate){
        return res.status(400).send({
            message: "Failed! Movie release date is not provided!"
        });
    }
    if(!req.body.director){
        return res.status(400).send({
            message: "Failed! Movie director is not provided!"
        });
    }
    next();
}