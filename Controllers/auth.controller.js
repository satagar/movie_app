const User=require('../models/user.model');
// const userSeed=require('../seeders/auth.seed');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const config =require('../configs/secretKey');


exports.signup=async(req,res)=>{
    const body=req.body;
    const userData={
        userId:body.userId,
        name:body.name,
        email:body.email,
        password:bcrypt.hashSync(body.password,8),
        userType:body.userType,
        userStatus:body.userStatus
    }
    try {
        const user=await User.create(userData);
        const userResp={
            userId: user.userId,
            name: user.name,
            email: user.email,
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
        const validPassword= bcrypt.compareSync(body.password, user.password);
        if(!validPassword){
            return res.status(401).send({message:"Invalid Password"})
        }
        const token = jwt.sign({ userId: user.userId }, config.secretKey, {
            expiresIn: 86400
        })
        return res.status(200).send({
            userId: user.userId,
            name: user.name,
            email: user.email,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token 
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}
exports.UpdatePassword= async (req, res)=>{
    const body= req.body;
    try {
        const user = await User.findOne({userId:req.userId})
        if(!user){
            return req.status(404).send({
                message:"User does not exists."
            })
        }
        user.password=bcrypt.hashSync(body.password,8)
        await user.save();
        return res.status(200).send({
            message:"user password update successfully"
        })
    } catch (error) {
        console.log(err.message);
        return res.status(500).send({
            message:"internal server error"
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