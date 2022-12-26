const PAYMENT = require('../models/payment.model');
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
            const booking = await PAYMENT.create(reqData)
             booking.totalAmount = Math.floor(movie.price *body.seats)
             booking.save()
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
