const USER = require('../../models/user.model');
const authController = require('../../controllers/auth.controller')
const authMiddleware = require('../../middleware/authValidate.middleware')
const {connectDB,closeDB,clearDB}  = require('../db')
const {mockRequest,mockResponse} = require('../interceptor')

beforeAll(async ()=>await connectDB())
beforeEach(async ()=>await clearDB())
afterAll(async ()=> await closeDB())

const userPayload = {
    "name":"Vishal4",
    "email":"vishal6@gmail.com",
    "password":"password4",
    "userType":"admin1"
}
describe('test middleware of auth middleware',()=>{
         it('should fail due to name not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            userPayload.name = null;
             req.body=userPayload;
             const nextSpy = jest.fn()
            //act
            await authMiddleware.authBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Bad request!"
                })
            )
         })
         it('should fail due to email not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            userPayload.name = "test";
            userPayload.email = null;
             req.body=userPayload;
             const nextSpy = jest.fn()
            //act
            await authMiddleware.authBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Bad request!"
                })
            )
         })
         it('should fail due to password not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            userPayload.name = "test";
            userPayload.email = "test@gmail.com"
            userPayload.password = null;
             req.body=userPayload;
             const nextSpy = jest.fn()
            //act
            await authMiddleware.authBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Bad request!"
                })
            )
         })
         it('should fail due to invalid email',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            userPayload.name = "test";
            userPayload.email = "test@.com"
            userPayload.password = "test";
             req.body=userPayload;
             const nextSpy = jest.fn()
            //act
            await authMiddleware.authBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Invalid Email , Bad request."
                })
            )
         })
       
})