const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
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
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        default:"CUSTOMER",
        enum:["CUSTOMER","ADMIN","CLINT"],
    },
    userStatus:{
        type:String,
        default:"APPROVED",
        enum:["APPROVED","PENDING","BLOCKED"]
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
        immutable: true
    },
    updatededAt:{
        type:String,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports=mongoose.model('user', userSchema);