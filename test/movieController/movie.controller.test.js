const movieController = require('../../controllers/movie.controller');
const MOVIE = require('../../models/movie.model')
const {connectDB,clearDB,closeDB} = require('../db')
const {mockRequest,mockResponse} = require('../interceptor')
const MovieMiddleware = require('../../middleware/movieValidation.middleware')
const moviePayload =   {
    "name":"DHAMAL test",
    "description":"a comedy movie test",
    "releaseDate":"12/11/1999",
    "releaseStatus":"RELEASED",
    "director":"test",
    "language":"HINDI",
    "movieImage":"test",
    "price":500,
    "trailerVideo":"test"
  }

  beforeAll(async ()=>await connectDB())
  beforeEach(async ()=>await clearDB())
  afterAll(async ()=> await closeDB())

  describe('movie controller test',()=>{
    it('create movie should pass',async ()=>{
        const req = mockRequest()
        const res = mockResponse()
        req.body = moviePayload;
        //act
        await movieController.createMovies(req,res)
        //asserts
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"Movie created successfully!",
            })
        )
    })
    // it('create movie should fail due to name undefined',async ()=>{
    //     const req = mockRequest()
    //     const res = mockResponse()
    //     moviePayload.name = null
    //     req.body = moviePayload;
        
    //     //act
    //     await movieController.createMovies(req,res)
    //     //asserts
    //     expect(res.status).toHaveBeenCalledWith(400)
    //     expect(res.send).toHaveBeenCalledWith(
    //         expect.objectContaining({
    //             message:"Movie Name not found! Name is required!"
    //         })
    //     )
    // })
  })