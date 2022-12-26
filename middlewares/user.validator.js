const jwt = require("jsonwebtoken")
const config = require("../configs/auth.config.js")
const User = require("../models/user.model")
const constants = require("../constants/constants")
const userModel = require("../models/user.model")


exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]

    if (!token) {
        return res.status(403).send({
            message: "No token is provided!"
        })
    }

    jwt.verify(token, config.secret_key, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "User is not authorised to login!"
            })
        }
        req.userId = decoded.userId
        next()
    })
}


exports.isAdmin = async (req, res, next) => {

    const user = await userModel.findOne({
        userId: req.userId
    })
    if (user && userModel.userType == constants.userType.admin) {
        next()
    } else {
        res.status(403).send({
            message: "This task requires Admin Role!"
        })
        return
    }
}

exports.validateUser = async (req, res, next) => {
    if (!req.body.name) {
        res.status(400).send({
            message: "User name is not provided!"
        })
        return
    }
    if (!req.body.userId) {
        res.status(400).send({
            message: "UserId is not provided!"
        })
        return
    }
    const user = await userModel.findOne({ userId: req.body.userId })
    if (user != null) {
        res.status(400).send({
            message: "UserId already exists!"
        })
        return
    }
    if (!req.body.email) {
        res.status(400).send({
            message: "Email Id is not provided!"
        })
        return
    }
    const email = await userModel.findOne({ email: req.body.email })
    if (email != null) {
        res.status(400).send({
            message: "This email Id already exists!"
        })
        return
    }
    //validating the type of user
    const userType = req.body.userType
    const userTypes = [constants.userType.admin, constants.userType.client, constants.userType.customer]
    if (userType && !userTypes.includes(userType)) {
        res.status(400).send({
            message: "Invalid user, please enter either Admin or Client or Customer"
        })
        return
    }

    const userStatus = req.body.userStatus
    const userStatuses = [constants.userStatus.approved, constants.userStatus.pending, constants.userStatus.suspended]
    if (userStatus && !userStatuses.includes(userStatus)) {
        res.status(400).send({
            message: "A user status should be either Approved or Pending oe Suspended"
        })
        return
    }
    next()
}

exports.isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}
