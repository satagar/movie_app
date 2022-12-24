const jwt = require("jsonwebtoken");
const config = require("../Configs/config.secret");

exports.validateToken = async(req, res, next) => {
    var authValue = req.headers["authorization"];
    if (typeof authValue === 'string') {
        var token = authValue.split(' ')[1];
    }


    if (!token) {
        return res.status(403).send({
            message: 'Token Not Found!'
        })
    }

    jwt.verify(token, config.secret, (err, decode) => {
        if (err) {
            // console.log(err)
            return res.status(401).send({
                message: 'Unauthorized'
            })
        }

        req.userId = decode.userId;
        next();
    })
}