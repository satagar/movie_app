const mongoose=require('mongoose');

const bookingSchema= new mongoose.Schema({

    theatreId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"theatre"
    },
    movieId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"movie"
    }, 
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user"
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
        type:Number
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
const book = mongoose.model('booking', bookingSchema);
module.exports=book;