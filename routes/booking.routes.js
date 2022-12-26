const booikingController = require('../controllers/booking.controller')

module.exports = function (app) {
    app.get("/mba/api/v1/bookings", booikingController.getAllBookings)
    app.get("/mba/api/v1/bookings/:id", booikingController.getBookingById)
    app.post("/mba/api/v1/bookings", booikingController.createBooking)
    app.put("/mba/api/v1/bookings/:id", booikingController.updateBooking)
}