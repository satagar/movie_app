const UserModel = require('../Models/user.model');

exports.findAll = async(req, res) => {
    let userNameReq = req.query.name,
        userStatusReq = req.query.userStatus,
        userRoleReq = req.query.role;

    var users;
    if (userNameReq) {
        try {
            users = await UserModel.find({ name: { $regex: userNameReq } }).exec();
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                message: 'Error Occurred in finding User with name '
            })
        }
    } else if (userRoleReq && userStatusReq) {
        try {
            users = await UserModel.find({ role: userRoleReq, userStatus: userStatusReq }).exec();
        } catch (error) {
            return res.status(500).send({
                message: 'Error Occurred in finding User with userStatus & Role '
            })
        }
    } else if (userRoleReq) {
        try {
            users = await UserModel.find({ role: userRoleReq }).exec();
        } catch (error) {
            return res.status(500).send({
                message: 'Error Occurred in finding User with Role'
            })
        }
    } else if (userStatusReq) {
        try {
            users = await UserModel.find({ userStatus: userStatusReq }).exec();
        } catch (error) {
            return res.status(500).send({
                message: 'Error Occurred in finding User with userStatus '
            })
        }

    } else {
        try {
            users = await UserModel.find().exec();
        } catch (error) {
            return res.status(500).send({
                message: 'Error Occurred in finding User '
            })
        }

    }

    if (users) {
        // console.log(users)
        let userResp = [];
        users.forEach(user => {
            userResp.push({
                    name: user.name,
                    userId: user.userId,
                    eamilId: user.emailId,
                    role: user.role,
                    userStatus: user.userStatus,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }

            )
        })
        res.status(200).send(userResp)
    } else {
        return res.status(200).send({
            message: 'User Not Found'
        })
    }


}