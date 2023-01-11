const mongoose=require('mongoose');

const theatreSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pinCode:{
        type:Number,
        required:true
    },
    movie:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref: 'movie'
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

module.exports=mongoose.model('theatre', theatreSchema)