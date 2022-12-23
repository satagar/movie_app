const userTypeValidate = require('../utils/constant')
const jwt = require('jsonwebtoken')
const USER = require('../models/user.model')
const key = require('../configs/scretKey')
const isValidEmail = (email)=>{
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}
exports.authBodyValidate =async  (req, res, next) => {
    const body = req.body;
    if (!body.name || !body.email || !body.password) {
        return res.status(400).send({
            message: "Bad request!"
        })
    }
    if(body.email){
        if(!isValidEmail(body.email)){
            return res.status(400).send({
                message: "Invalid Email , Bad request."
            })
        }
         const user = await USER.findOne({email:body.email});
         if(user){
            return res.status(400).send({
                message: "email already exists Please fill unique email , Bad request!"
            })
         }
    }

    if(body.userType){
        if(!userTypeValidate.usertype[body.userType.toUpperCase()]){
            return res.status(400).send({
                message: "Invalid userType ,  Bad Request."
            })
        }
        body.userType = userTypeValidate.usertype[body.userType.toUpperCase()];
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
exports.isAdmin =async (req,res,next)=>{
    try {
            const user = await USER.findOne({userId:req.userId});
            if(user && user.userType=='ADMIN'){
                 next()
            }else{
                    return res.status(403).send({
                        message:"Require Admin Role!"
                    })
            }
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error. please try after some time."
        })
    }
}