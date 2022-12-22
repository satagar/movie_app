const UserModel = require("../Models/user.model");
const bcrypt = require("bcrypt");

exports.update = async(req, res) => {
    try {
        await UserModel.findOneAndUpdate({
            userId: req.userId
        }, {
            password: bcrypt.hashSync(req.body.password, 8)
        }).exec();
        res.status(200).send({
            message: "User Updated Successfully!"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error Occurred in Updation!"
        })
    }
}

exports.userUpdate = async(req, res) => {
    try {
        const user = await UserModel.findOneAndUpdate({
            userId: req.params.id
        }, {
            name: req.body.name,
            role: req.body.role,
            userStatus: req.body.userStatus
        }).exec();
        res.status(200).send({
            message: 'User Updated Successfully!'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error In Updation!'
        })
    }
}