const userModel = require('../models/user.model')
const constants = require('../constants/user.constants')
const { userType, userStatus } = require('../constants/user.constants')
const bcrypt = require('bcryptjs')
const config = require('../configs/auth.config')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) => {

    if (req.body.userStatus == undefined) {
        if (req.body.userType == undefined || req.body.userType == constants.userType.customer) {
            userStatus = constants.userStatus.approved
        } else {
            userStatus = constants.userStatus.pending
        }
    }
    if (req.body.userStatus == constants.userStatus.suspended) {
        return res.status(200).send({
            message: " You can't signUp again, your account status is${constants.userStatus.suspended}"
        })
    }
    try {
        const userObj = {
            name: req.body.name,
            userId: req.body.userId,
            email: req.body.email,
            userType: req.body.userType,
            password: bcrypt.hashSync(req.body.password, 12),
            userStatus: userStatus
        }
        const createdUser = await userModel.create(userObj)
    } catch (error) {
        message: "Failed to create user!"
        const postResponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userTypes: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
    }
    return res.status(201).send(postResponse)
}

exports.signIn = async (req, res) => {
    const findUser = await userModel.findOne({ userId: req.body.userId })
    if (!req.body.userId) {
        res.status(400).send({ message: " User not found!" })
        return
    }
    if (findUser.userStatus != approved || findUser.userStatus == suspended) {
        res.status(200).send({
            message: "Unauthorised user, account status is ${findUser.userStatus}"
        })
        return
    }
}

exports.validatePassword = async (req, res) => {
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    var token = jwt.sign({ userId: userModel.userId }, config.secret_key)
    res.status(200).send({
        name: userModel.name,
        userId: userModel.userId,
        email: userModel.email,
        userType: userModel.userType,
        userStatus: userModel.userStatus
    })
}