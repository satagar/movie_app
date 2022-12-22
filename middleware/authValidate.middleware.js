const userTypeValidate = require('../utils/constant')
const jwt = require('jsonwebtoken')
const key = require('../configs/scretKey')
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
exports.isValidBodyForSignin = (req,res,next)=>{
    const body = req.body
    if (!body.email || !body.password) {
        return res.status(400).send({
            message: "Bad request!"
        })
    }
    next()
}
exports.updateValidation = (req,res,next)=>{
    if(!req.body.password){
        return res.status(400).send({
            message: "Bad request!"
        })
    }
    next()
}
exports.isAuthorized = (req,res,next)=>{
   if(!req.headers["authorization"]){
        return res.status(400).send({
            message:"Bad request!"
        });
    }
   const token = req.headers["authorization"].split(' ')[1];
   jwt.verify(token,key.scretKey,(err,decodedId)=>{
           if(err){
            return res.status(401).send({
                message:"Unauthorized User!"
            });
           }
           req.userId = decodedId.userId
           next();
   })
}