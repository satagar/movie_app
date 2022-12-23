const UserModel = require("../Models/user.model");

exports.isAdmin = async(req, res, next) => {
    try {
        const user = await UserModel.findOne({
            userId: req.userId
        });

        if (user && user.userStatus == "APPROVED") {
            next();
        } else {
            return res.status(403).send({
                message: "Admin is Required!"
            })
        }
    } catch (error) {
        // console.log(error);
        return res.status(500).send({
            message: "Error in Admin Verfication"
        })
    }

}