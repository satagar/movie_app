const paymentController = require('../controllers/payment.controller')


module.exports = function (app) {
    app.get("/mba/api/v1/payments")
    app.get("/mba/api/v1/payments/:id")
    app.post("/mba/api/v1/payments")
}