const ObjectId= require('mongoose').Types.ObjectId;
const User=require('../models/user.model');
const Theatre= require('../models/theatre.model');
const Booking=require('../models/booking.model');

exports.validateBooking= async (req,res,next)=>{
    const body= req.body;
    if (!req.body.theatreId) {
        return res.status(400).send({
        message: "Failed! theatreId is not provided !"
        });
    }
    if (!ObjectId.isValid(req.body.theatreId)) {

        return res.status(400).send({
        message: "Failed! theatreId is not valid format !"
        });
    }
    if (!req.body.movieId) {
        return res.status(400).send({
        message: "Failed! movieId is not provided !"
        });
    }
    if (!ObjectId.isValid(req.body.movieId)) {
        return res.status(400).send({
        message: "Failed! movieId is not valid format !"
        });
    }
    if(!req.body.timing){
        return res.status(400).send({
            message: "Failed! timing is not provided !"
            });
    }
    if(!req.body.noOfSeats){
        return res.status(400).send({
            message: "Failed! Number of seats is not provided !"
            });
    }
    try {
        const theatre = await Theatre.findOne({_id : body.theatreId});
        if(!theatre){
            return res.status(404).send({
                message:"Theater does not exists!"
                });
        }
        if(!theatre.movie.includes(body.movieId)){
            return res.status(400).send({
            message: "Failed! movieId passed is not available inside the theatre !"
            });
     }
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message: "Something want wrong!"
            });
    }
    next ()
    
}