const ObjectId = require('mongoose').Types.ObjectId;
const USER = require('../models/user.model')
const THEATER  = require('../models/theater.model')
const BOOKING = require('../models/booking.model')
exports.validateBookingBody =async (req,res,next)=>{
    const body = req.body;
        if(!body.theaterId){
            return res.status(400).send({
                message: "Failed! theaterId is not provided !"
                });
        }
        if (!ObjectId.isValid(body.theaterId)) {
            return res.status(400).send({
            message: "Failed! theaterId is not valid format !"
            });
    }
    if(!body.movieId){
        return res.status(400).send({
            message: "Failed! movieId is not provided !"
            });
    }
    if (!ObjectId.isValid(body.movieId)) {
        return res.status(400).send({
        message: "Failed! movieId is not valid format !"
        });
}

if(!body.timing){
    return res.status(400).send({
        message: "Failed! timing is not provided !"
        });
}
if(!body.seats){
    return res.status(400).send({
        message: "Failed! Number of seats is not provided !"
        });
}

try {
    const user = await USER.findOne({userId:req.userId});
    req.body.userId = user._id;
}catch(err){
    return res.status(500).send({
        message: "Something want wrong!"
        });
}

try {
    const theater = await THEATER.findOne({_id : body.theaterId});
    if(!theater){
        return res.status(404).send({
            message:"Theater does not exists!"
            });
    }
    if(!theater.movies.includes(body.movieId)){
        return res.status(400).send({
        message: "Failed! movieId passed is not available inside the theatre !"
        });
 }
}catch(err){
    return res.status(500).send({
        message: "Something want wrong!"
        });
}
next ()
}
exports.updateBodyValidate = async (req,res,next)=>{
    const body = req.body
    if(!req.params.id){
        return res.status(400).send({
            message:"Booking ID required!"
            });
    }
   if(req.body.theaterId && req.body.movieId){
    try {
        const theater = await THEATER.findOne({_id : body.theaterId});
        if(!theater){
            return res.status(404).send({
                message:"Theater does not exists!"
                });
        }
        if(!theater.movies.includes(body.movieId)){
            return res.status(400).send({
            message: "Failed! movieId passed is not available inside the theatre !"
            });
     }
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message: "Something want wrong!"
            });
    }
   }
   if(req.body.theaterId){
    try {
        const theater = await THEATER.findOne({_id : body.theaterId});
        if(!theater){
            return res.status(404).send({
                message:"Theater does not exists!"
                });
        }
        const booking = await BOOKING.findOne({_id:req.params.id})
        if(!theater.movies.includes(booking.movieId)){
            return res.status(400).send({
            message: "Failed! Movie  is not available inside the Updated theatre !"
            });
     }
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message: "Something want wrong!"
            });
    }
   }
   if(req.body.movieId){
    try {
        const booking = await BOOKING.findOne({_id:req.params.id});
        const theater = await THEATER.findOne({_id : booking.theaterId});
        if(!theater){
            return res.status(404).send({
                message:"Theater does not exists!"
                });
        }
        if(!theater.movies.includes(req.body.movieId)){
            return res.status(400).send({
            message: "Failed! Theater  is not available for the Updated Movie !"
            });
     }
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message: "Something want wrong!"
            });
    }
   }
   next ()
}

exports.validateForGetBooking = async (req,res)=>{
    try {
            const user = await USER.findOne({userId:req.userId})
            if(user.userType!=='ADMIN'){
                 req.body.userId = user._id;
            }
            next()
    }catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Something want wrong!"
            });
    }
}