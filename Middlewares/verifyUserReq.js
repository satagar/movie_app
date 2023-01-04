const UserModel = require("../Models/user.model");

exports.verifyUserRequest = async(req, res, next) => {
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name is Required"
        })
    }

    if (!req.body.userId) {
        return res.status(400).send({
            message: "UserId is Required"
        })
    }

    const user = await UserModel.findOne({ userId: req.params.userId })
    if (user) {
        return res.status(400).send({
            message: 'UserId already used!'
        })
    }

    if (!req.body.emailId) {
        return res.status(400).send({
            message: "EmailId is Required"
        })
    }


    const userByEmail = await UserModel.findOne({ emailId: req.body.emailId })
    if (userByEmail) {
        return res.status(400).send({
            message: 'EmailId already used!'
        })
    }

    if (!req.body.role) {
        return res.status(400).send({
            message: "Role is Required"
        })
    }
    const roleTypes = ["CUSTOMER", "ADMIN", "CLIENT"];
    if (!roleTypes.includes(req.body.role)) {
        return res.status(400).send({
            message: "Roles invalid values must be CUSTOMER|| ADMIN|| CLIENT"
        })
    }

    next();
}

exports.verifyUserStatus = async(req, res, next) => {
    if (!req.body.role) {
        return res.status(400).send({
            message: "Role is Required"
        })
    }
    const roleTypes = ["CUSTOMER", "ADMIN", "CLIENT"];
    if (!roleTypes.includes(req.body.role)) {
        return res.status(400).send({
            message: "Roles invalid values must be CUSTOMER|| ADMIN|| CLIENT"
        })
    }

    if (!req.body.userStatus) {
        return res.status(400).send({
            message: "UserStatus is Required!"
        })
    }

    const userStatusTypes = ["APPROVED", "PENDING"];
    if (!userStatusTypes.includes(req.body.userStatus)) {
        return res.status(400).send({
            message: "userStatus Invalid values must be APPROVED || PENDING"
        })
    }
    next();
}