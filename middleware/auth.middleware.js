const User=require("../models/user.model");
const jwt=require('jsonwebtoken');
const key=require('../configs/secretKey');

exports.validateAuth= async (req,res,next)=>{
    if(!req.body.userId ||!req.body.name ||!req.body.email||!req.body.password){
        return res.status(400).send({
            message:"Failed! bad request"
        })
    }
    if(body.email){
        const user= await User.findOne({email:body.email});
        if(user){
            return res.status(400).send({
                message:"email is already exist"
            })
        }
    }
    if(!req.body.usreType){
        return res.status(400).send({
            message:"user type is require"
        })
    }
    const UserType=["CUSTOMER","ADMIN","CLINT"]
    if(!req.body.userType.includes(UserType)){
        return res.status(400).send({
            message:"User type is CUSTOMER,ADMIN,CLINT"
        })
    }
    next();
}

exports.updateValidaton=(req,res,next)=>{
    if(!req.body.password){
        return res.status(400).send({
            message:"Bad request!"
        })
    }
    next()
}

exports.isAuthorized = (req,res,next)=>{
    if(!req.headers["authorization"]){
         return res.status(403).send({
             message:"No token provided!"
         });
     }
    const token = req.headers["authorization"].split(' ')[1];
    jwt.verify(token, key.secretKey,(err,decodedId)=>{
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
            const user = await User.findOne({userId:req.userId});
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