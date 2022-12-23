const THEATER = require('../../models/theater.model');
const theaterController = require('../../controllers/theater.controller')
const theaterMiddleware = require('../../middleware/theaterValidate.middleware')
const {connectDB,closeDB,clearDB}  = require('../db')
const {mockRequest,mockResponse} = require('../interceptor');
const { theater } = require('../../seeders/theater.seed');

beforeAll(async ()=>await connectDB())
beforeEach(async ()=>await clearDB())
afterAll(async ()=> await closeDB())

const theaterPayload ={
    "name":"seed7",
    "description":"seed7 description",
    "city":"seed7 city",
    "pincode":8984545
}
describe('test middleware of Theater middleware',()=>{
         it('should fail due to name not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            theaterPayload.name = null;
             req.body=theaterPayload;
             const nextSpy = jest.fn()
            //act
            await theaterMiddleware.theaterReqBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Name is required , Bad Request!"
                })
            )
         })
         it('should fail due to description not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            theaterPayload.name = "test";
            theaterPayload.description = null;
             req.body=theaterPayload;
             const nextSpy = jest.fn()
            //act
            await theaterMiddleware.theaterReqBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Description is required , Bad Request!"
                })
            )
         })
         it('should fail due to city not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            theaterPayload.name = "test";
            theaterPayload.description = "test theater"
            theaterPayload.city = null;
             req.body=theaterPayload;
             const nextSpy = jest.fn()
            //act
            await theaterMiddleware.theaterReqBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "City is required , Bad Request!"
                })
            )
         })
         it('should fail due to pincode not provide',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            theaterPayload.name = "test";
            theaterPayload.description = "test theater"
            theaterPayload.city = "test";
            theaterPayload.pincode = null;
             req.body=theaterPayload;
             const nextSpy = jest.fn()
            //act
            await theaterMiddleware.theaterReqBodyValidate(req,res,nextSpy)
            //asserts
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Pincode is required , Bad Request!"
                })
            )
         })
         it('should fail due to dublicate theater in same location',async ()=>{
            //arrange
            const req = mockRequest()
            const res = mockResponse()
            theaterPayload.name = "test";
            theaterPayload.description = "test theater"
            theaterPayload.city = "test";
            theaterPayload.pincode = 855522;
             req.body=theaterPayload;
             const nextSpy = jest.fn()
             const theaterSpy = jest.spyOn(THEATER,'findOne').mockReturnValue(Promise.resolve(theaterPayload))
            //act
            await theaterMiddleware.theaterReqBodyValidate(req,res,nextSpy)
            //asserts
            expect(theaterSpy).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    message: "Theater is same location  already exists , Bad Request!"
                })
            )
         })
})