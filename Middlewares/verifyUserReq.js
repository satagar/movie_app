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

    if (!req.body.email) {
        return res.status(400).send({
            message: "EmailId is Required"
        })
    }


    const email = await UserModel.findOne({ emailId: req.body.emailId })
    if (email) {
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
    if (!req.body.role.includes(roleTypes)) {
        return res.status(400).send({
            message: "Roles invalid values must be CUSTOMER|| ADMIN|| CLIENT"
        })
    }

    next();
}