const UserModel = require('../Models/user.model');
const Theatre = require('../Models/theatre.model');

exports.isAdminOrClient = async(req, res, next) => {
    const user = await UserModel.findOne({ userId: req.userId });

    if (user && (user.role === "CLIENT" || user.role === "ADMIN")) {
        if (user.role === "CLIENT") {
            const theatre = await Theatre.find({ _id: req.params.id });
            if (theatre.ownerId != user._id) {
                return res.status(403).send({
                    message: 'Client requesting to update is not the Owner!'
                })
            } else {
                next();
            }
        }
        next();
    } else {
        return res.status(403).send({
            message: "Admin role or Client role is Required!"
        })
    }
}