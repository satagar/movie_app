const express = require("express");
const router = express.Router();


//-------------------Other Validators-----------------------------
const tokenValidator = require('../../Utilis/validateToken');
const isAdminValidation = require('../../Utilis/isAdmin')

//----------------PaymentControllerAndMiddlewares----------------
const createPaymentController = require("../../Controllers/Payment.Controller/createPayment.controller");
const validatePayment = require("../../Middlewares/verifyPaymentReq");
const getAllPayment = require("../../Controllers/Payment.Controller/GetAllPayment.controller");
const getByIdPayment = require("../../Controllers/Payment.Controller/getPaymentById.controller");

//---------------------------Payment routes------------------------------------
router.post("/movie_app/api/v1/payments", tokenValidator.validateToken, validatePayment.verifyPayment, createPaymentController.creatingPayment);
router.get("/movie_app/api/v1/payments", tokenValidator.validateToken, getAllPayment.findAll);
router.get("/movie_app/api/v1/payments/:id", tokenValidator.validateToken, isAdminValidation.isAdmin, getByIdPayment.getPaymentOnId)


module.exports = router;