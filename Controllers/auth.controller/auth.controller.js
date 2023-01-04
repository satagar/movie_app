const User = require("../../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../Configs/config.secret");

exports.signup = async(req, res) => {

    const role = req.body.role;
    let userStatus = req.body.userStatus;
    if (role == "CUSTOMER" || role == "ADMIN") {
        userStatus = "APPROVED";
    } else {
        userStatus = "PENDING";
    }

    userObj = {
        name: req.body.name,
        userId: req.body.userId,
        emailId: req.body.emailId,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    try {
        const user = await User.create(userObj)
        console.log(user);
        const userResp = {
            name: user.name,
            userId: user.userId,
            emailId: user.emailId,
            role: user.role,
            userStatus: user.userStatus,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        return res.status(201).send(userResp);
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in signup!"
        })
    }
}

exports.login = async(req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    try {
        const user = await User.findOne({
            userId: userId
        }).exec();

        if (!user) {
            return res.status(404).send({
                message: "User Not found!"
            })
        }
        if (user.userStatus != "APPROVED") {
            return res.status(200).send({
                message: "User Not Allowed to Login"
            })
        }

        var validatePassword = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!validatePassword) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password'
            })
        }

        var token = jwt.sign({ userId: user.userId }, config.secret, {
            expiresIn: 86400
        })

        const userResp = {
            name: user.name,
            userId: user.userId,
            emailId: user.emailId,
            role: user.role,
            userStatus: user.userStatus,
            accessToken: token
        }

        res.status(200).send(userResp);

    } catch (error) {
        res.status(500).send({
            message: "Failure in Login!"
        })
    }
}