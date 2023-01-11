const mongoose=require('mongoose')

const paymentSchema= mongoose.Schema({

    bookingId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"booking"
    },
    amount:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:"FAILED"
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
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
module.exports=mongoose.model("payment",paymentSchema);