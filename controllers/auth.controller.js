const USER  = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const secretKey = require('../configs/scretKey')
const {usertype,userStatus}= require('../utils/constant')

exports.signup = async (req,res)=>{
    const body = req.body;
        const  userData = {
            userId:body.name+parseInt(Math.random()*10000),
            name:body.name,
            email:body.email,
            password:bcrypt.hashSync(body.password,10)
        }
        if(body.userType){
            userData.userType = body.userType;
        }
        if(body.userType!=='CUSTOMER'){
            userData.userStatus = "PENDING";
        }
        try {
                const user = await USER.create(userData);
                return res.status(201).send({
                    message:"User Signup successfully.",
                    UserID :user.userId
                })
        }catch (err) {
            console.log(err.message);
            return res.status(500).send({
                message:"Internal server error! Try after some time."
            })
        }
    }

    exports.signin = async (req,res)=>{
            const body = req.body;
            try {
                  const user = await USER.findOne({email:body.email});
                  if(!user){
                    return res.status(404).send({
                        message:"User does not exists.",
                    })
                  }
                  if(user.userStatus!=='APPROVED'){
                    return res.status(200).send({
                        message:`Can't allow login as user is in status : [ ${user.userStatus}] `,
                    })
                  }
                  const isValidPassword = bcrypt.compareSync(body.password,user.password);
                  if(!isValidPassword){
                    return res.status(401).send({
                        message:`Invalid Password! `,
                    })
                  }else{
                      const token = jwt.sign({userId:user.userId},secretKey.scretKey,{
                        expiresIn:'1d'
                      })
                      return res.status(200).send({
                        message:"User  login Successfully!",
                        accessToken : token
                      })
                  }
                  
            }catch (err) {
                console.log(err.message);
                return res.status(500).send({
                    message:"Internal server error! Try after some time."
                })
            }
    }

exports.UpdatePassword = async (req,res)=>{
          const body = req.body;
          try {
                 const user = await USER.findOne({userId:req.userId})
                 if(!user){
                    return res.status(404).send({
                        message:"User does not exists.",
                    })
                  }
                 user.password = bcrypt.hashSync(body.password,10)
                 await user.save();
                 return res.status(200).send({
                     message:"user password update successfully."
                 })
          }catch (err) {
            console.log(err.message);
            return res.status(500).send({
                message:"Internal server error! Try after some time."
            })
        }
}
exports.updateUser = async (req,res)=>{
    const body = req.body;
    const id = req.params.id;
   try {
       const user = await USER.findOne({userId:id})
       if(!user){
        return res.status(404).send({
            message:"user does not exists."
        })
       }
       if(body.name){
        user.name = body.name
       }

     if(body.userType){
        if(!usertype[body.userType.toUpperCase()]){
            return res.status(400).send({
                message: "Invalied userType ,  Bad Request."
            })
        }
        user.userType = body.userType.toUpperCase()
    }
    if(body.userStatus){
        if(!userStatus[body.userStatus.toUpperCase()]){
            return res.status(400).send({
                message: "Invalied userstatus ,  Bad Request."
            })
        }
        user.userStatus = body.userStatus.toUpperCase()
    }
       if(body.email){
        user.email = body.email;
       }
       await user.save()
       return res.status(200).send({
        message:"user update successfully",
        updated_user: user
       })
   }catch(err){
    console.log(err.message)
    return res.status(500).send({
        message:"Internal server error!"
    })
   }
}

exports.userFilter = async (req,res)=>{
    const find = {};
    const query = req.query;
    if(query.id){
           find._id = query.id
    }
    if(query.name){
        find.name = {
            $regex:query.name
        }
    }
    try{
        const user = await USER.find(find)
        return res.status(200).send({
            USER_DETAILS : user
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error"
        })
    }
}