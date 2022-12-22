const userTypeValidate = require('../utils/constant')
exports.authBodyValidate = (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.email || !body.password) {
        return res.status(400).send({
            message: "Bad request!"
        })
    }
    if(body.userType){
        if(!userTypeValidate[body.userType.toUpperCase()]){
            return res.status(400).send({
                message: "Invalied userType ,  Bad Request."
            })
        }
        body.userType = userTypeValidate[body.userType.toUpperCase()];
    }
    next()
}
exports.isValiedBodyForSignin = (req,res,next)=>{
    const body = req.body
    if (!body.email || !body.password) {
        return res.status(400).send({
            message: "Bad request!"
        })
    }
    next()
}