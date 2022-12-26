const constants = require('../constants/app.constants')

exports.validateMovie = async (req, res, next) => {
    if (!req.body.movieId) {
        res.status(400).send({
            message: "No movie is provided!"
        })
        return
    }
    if (!req.body.name) {
        return res.status(400).send({
            message: "Failed! Movie name is not provided."
        })
    }
    if (!req.body.Description) {
        return res.status(400).send({
            message: "Failed! Description can't be left empty"
        })
    }
    if (!req.body.releaseStatus) {
        return res.status(400).send({
            message: "No movie reease status is choosen"
        })
    }
    const releaseStatus = req.body.releaseStatus
    const releaseStatusOptions = [constants.releaseStatus.unReleased, constants.releaseStatus.released, constants.releaseStatus.blocked]
    if (!releaseStatusOptions.includes(releaseStatus)) {
        return res.status(400).send({
            message: "No valid release status is choosen, please select either- Unreleased or Released or Blocked"
        })
    }

    if (!req.body.ReleaseDate) {
        return res.status(400).send({
            message: "Please provide a release date!"
        })
    }
    if (!req.body.director) {
        return res.status(400).send({
            message: "Provide a movie director name!"
        })
    }
    next()
}