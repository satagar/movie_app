const BOOKING = require('../models/booking.model');
const MOVIE = require('../models/movie.model')
exports.CreateBooking = async (req,res)=>{
    const body   = req.body;
    const reqData = {
        theaterId:body.theaterId,
        movieId:body.movieId,
        userId:body.userId,
        timing:body.timing,
        noOfSeats:body.seats
    }
    try {
           const movie = await MOVIE.findOne({_id:body.movieId})
            const booking = await BOOKING.create(reqData)
             booking.totalAmount = Math.floor(movie.price * body.seats)
             await booking.save()
            return  res.status(201).send({
                    message:"Movie Booked Successfully.",
                    Booking_Summary : booking
            })
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error! Please try after some time."
        })
    }
}

exports.bookingUpdate = async (req,res)=>{
    const body = req.body;
    const id = req.params.id
    try {
                const booking = await BOOKING.findOne({_id:id});
                if(!booking){
                    return res.status(404).send({
                        message:"Booking Details Does not exists!"
                    })
                }
                if(body.theaterId){
                       booking.theaterId = body.theaterId
                }
                if(body.movieId){
                    booking.movieId = body.movieId
                }
                if(body.timing){
                    booking.timing = body.timing
                }
                if(body.seats){
                    booking.noOfSeats = body.seats;
                }
                await booking.save()
                return res.status(200).send({
                    message:"Booking details Update successfully.",
                    Updated_Booking_Details : booking
                })
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error! Please try after some time."
        })
    }
}