const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    theaterId : {
        type:mongoose.SchemaTypes.ObjectId,
        ref:"theater"
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"movies"
    },
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"users"
    },
    timing:{
           type:String,
           required:true
    },
    status:{
        type:String,
        default:"IN_PROGRESS"
    },
    noOfSeats:{
        type:Number,
        required:true
    },
    totalAmount:{
        type:Number,
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

const  bookingModel = mongoose.model('bookingDetails',bookingSchema)
module.exports = bookingModel;