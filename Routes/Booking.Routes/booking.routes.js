const express = require("express");
const router = express.Router();


//-------------------Other Validators-----------------------------
const tokenValidator = require('../../Utilis/validateToken');
const isAdminValidation = require('../../Utilis/isAdmin')

//-------------------BookingControllerAndMiddleware-----------
const bookingController = require("../../Controllers/Booking.Controller/createBooking.controller")
const validateBookingReq = require("../../Middlewares/verifyBookingReq")
const updateBookingController = require("../../Controllers/Booking.Controller/updateBooking.controller")
const getByIdBookingController = require("../../Controllers/Booking.Controller/getByIdBooking.controller")
const getAllBookingController = require("../../Controllers/Booking.Controller/GetAllBooking.controller")


//---------------------------Booking routes------------------------------------
router.post("/movie_app/api/v1/bookings", tokenValidator.validateToken, validateBookingReq.verifyBooking, bookingController.createBooking)
router.put("/movie_app/api/v1/bookings/:id", tokenValidator.validateToken, isAdminValidation.isAdmin, updateBookingController.updateBooking)
router.get("/movie_app/api/v1/bookings/:id", tokenValidator.validateToken, isAdminValidation.isAdmin, getByIdBookingController.findById)
router.get("/movie_app/api/v1/bookings", tokenValidator.validateToken, isAdminValidation.isAdmin, getAllBookingController.getAllBookings)



module.exports = router;