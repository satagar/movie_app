const USER  = require('../models/user.model');
const bcrypt = require('bcrypt');

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