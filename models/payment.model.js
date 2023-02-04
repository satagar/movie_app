const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({
    bookingId : {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"bookingDetails"
    },
    amount:{
        type:Number,
        required:true
    },
    status : {
        type:String,
        default:"FAILED"
    },
    createAt:{
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

const paymentModel = mongoose.model('payment',paymentSchema)
module.exports = paymentModel;