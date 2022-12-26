const jwt = require("jsonwebtoken")
const config = require("../configs/auth.config.js")
const User = require("../models/user.model")
const constants = require("../utils/constants")


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            message: "No token is provided!"
        })
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "User is not authorised to login!"
            })
        }
        req.userId = decoded.id
        next()
    })
}


isAdmin = async (req, res, next) => {

    const user = await User.findOne({
        userId: req.userId
    })
    if (user && user.userType == constants.userTypes.admin) {
        next()
    } else {
        res.status(403).send({
            message: "This task requires Admin Role!"
        })
        return
    }
}


exports.authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}