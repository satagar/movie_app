const UserModel = require("../Models/user.model");
const bcrypt = require("bcrypt");

exports.update = async(req, res) => {
    try {
        await UserModel.findOneAndUpdate({
            id: req.params.id
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