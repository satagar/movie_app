const User=require('../models/user.model');
const userSeed=require('../seeders/auth.seed');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const secretKey=require('../configs/secretKey');

exports.signup=async(req,res)=>{
    const body=req.body;
    const userData={
        userId:body.userId,
        name:body.name,
        email:body.email,
        password:bcrypt.hashSync(body.password,8)
    }
    try {
        const user=await User.create(userData);
        const userResp={
            userId: user.userId,
            name: user.name,
            emailId: user.emailId,
            password:user.password,
            userType: user.userType,
            userStatus: user.userStatus,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        return res.status(201).send(userResp);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
        
    }
}

exports.signin=async(req,res)=>{
    const body=req.body;
    try {
        const user=await User.findOne({userId:body.userId});
        if(!user){
            return res.status(404).send({message:"user not found!"})
        }
        if(user.userStatus!="APPROVED"){
            return res.status(200).send({message:"user not allow"})
        }
        const validPassword= bcrypt.compareSync(body.password.user.password);
        if(!validPassword){
            return res.status(401).send({message:"Invalid Password"})
        }
        const token = jwt.sign({ userId: user.userId }, config.secret, {
            expiresIn: 86400
        })
        return res.status(200).send({
            message:"user login Successfully",
            accessToken: token 
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}

// const createUser = async (data)=>{
//     for(let i=0;i<data.length;i++){
//         await User.create(data[i])
//     }
//     console.log('user created')
// }
// createUser(userSeed.userData)