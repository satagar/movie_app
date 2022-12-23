const UserModel = require("../Models/user.model");
const bcrypt = require("bcrypt");

exports.update = async(req, res) => {
    try {
        const users = await UserModel.findOneAndUpdate({
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


//http://localhost:5500/movie_app/api/v1/users/63a478579d7586e318245fc6
//use Admin login token and same user Id for update
exports.userUpdate = async(req, res) => {
    try {
        const users = await UserModel.findOneAndUpdate({
            userId: req.userId
        }, {
            name: req.body.name,
            role: req.body.role,
            userStatus: req.body.userStatus
        }).exec();
        console.log(users)
        res.status(200).send({
            message: 'User Updated Successfully!',
            User: users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error In Updation!'
        })
    }
}