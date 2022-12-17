const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../Configs/config.secret");

exports.signUp = async(req, res) => {

    userObj = {
        name: req.body.name,
        userId: req.body.userId,
        emailId: req.body.emailId,
        role: req.body.role,
        password: bcrypt.hashSync(req.body.password, 8)
    }

    try {
        const user = User.create(userObj)
        return res.status(201).send(user);
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
            return res.status(400).send({
                message: "User Not found!"
            })
        }

        var validatePassword = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!validatePassword) {
            return res.status(401).send({
                message: 'Invalid Password'
            })
        }

        var token = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: 86400
        })

        const userResp = {
            name: user.name,
            userId: user.userId,
            emailId: user.emailId,
            role: user.role,
            accessToken: token
        }

        res.status(200).send(userResp);

    } catch (error) {
        res.status(500).send({
            message: "Failure in Login!"
        })
    }
}