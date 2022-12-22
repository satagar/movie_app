const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
       type:String,
       unique:true,
       required:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:["CUSTOMER","CLIENT","ADMIN"]
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now()
        },
        immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now()
        }
    }
})
const userModel = mongoose.model('users',userSchema);
module.exports = userModel;