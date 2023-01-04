const express = require("express");
const router = express.Router();


//------------------UserController-----------------------------
const authController = require("../../Controllers/auth.controller/auth.controller")
const updateController = require("../../Controllers/auth.controller/auth.update.controller")
const findAllController = require("../../Controllers/auth.controller/auth.getAllUser.controller")

//-----------------UserMiddlewares-------------------------------
const UserMiddleware = require("../../Middlewares/verifyUserReq")
const UpdateMiddleware = require("../../Middlewares/verifyUserReq")


//-------------------Other Validators-----------------------------
const validate = require("../../Utilis/validateToken")
const isAdminvalidation = require("../../Utilis/isAdmin");

//-------------------------User ------------------------------------
router.post("/movie_app/api/v1/auth/signup", UserMiddleware.verifyUserRequest, authController.signup);
router.post("/movie_app/api/v1/auth/login", authController.login);
router.get("/movie_app/api/v1/users", validate.validateToken, isAdminvalidation.isAdmin, findAllController.findAll) //Help in Checking Failure cases
router.put("/movie_app/api/v1/users", validate.validateToken, UpdateMiddleware.verifyUserStatus, updateController.update)
router.put("/movie_app/api/v1/users/:userId", validate.validateToken, isAdminvalidation.isAdmin, isAdminvalidation.isAdmin, UpdateMiddleware.verifyUserStatus, updateController.userUpdate)


module.exports = router;