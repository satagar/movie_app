const Booking= require('../models/booking.model');

exports.createBooking= async (req,res)=>{
    const body=req.body;
    const bookingObj={
        theatreId:body.theatreId,
        movieId:body.movieId,
        userId:body.userId,
        timing:body.timing,
        noOfSeats:body.noOfSeats
    }
    try {
        const booking = await Booking.create(bookingObj);
        return res.status(201).send(booking)
        
    } catch (error) {
        return res.status(500).send({
            message:"internal server error"
        })
    }
}

exports.updateBooking= async (req,res)=>{

    const body=req.body;
    try {
        const booking= await Booking.findOne({_id:req.params.id})
        if(!booking){
            return res.status(404).send({
                message:"Booking details not exist"
            })
        }
        if(body.theatreId){
            booking.theatreId = body.theatreId
        }
        if(body.movieId){
            booking.movieId = body.movieId
        }
        if(body.timing){
            booking.timing = body.timing
        }
        if(body.seats){
            booking.noOfSeats = body.noOfSeats;
        }
        await booking.save()
        return res.status(200).send(booking)

    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message:"Internal server error"
        })
    }
}

exports.getAllBooking= async (req,res)=>{
    const reqData = {}
    if(req.body.userId){
        reqData.userId = req.body.userId
    }
    try {
        const booking = await Booking.find(reqData)
        return  res.status(200).send(booking)
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}

exports.getBookingByID = async (req,res)=>{
    const id = req.params.id;
    try {
        const booking = await Booking.findOne({_id:id})
        if(!booking){
            return res.status(404).send({
                message:"Booking does not exists!"
            })
        }
        return  res.status(200).send(booking)
    }catch(error){
        console.log(error.message);
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}