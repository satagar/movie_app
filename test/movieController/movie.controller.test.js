const movieController = require('../../controllers/movie.controller');
const MOVIE = require('../../models/movie.model')
const {connectDB,clearDB,closeDB} = require('../db')
const {mockRequest,mockResponse} = require('../interceptor')
const MovieMiddleware = require('../../middleware/movieValidation.middleware')
const moviePayload =   {
    "_id":"1",
    "name":"DHAMAL test",
    "description":"a comedy movie test",
    "releaseDate":"12/11/1999",
    "releaseStatus":"RELEASED",
    "director":"test",
    "language":"HINDI",
    "movieImage":"test",
    "price":500,
    "trailerVideo":"test",
    save:jest.fn()
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
    it('create movie should fail due to internal error',async ()=>{
        const req = mockRequest()
        const res = mockResponse()
        moviePayload.name = null
        req.body = moviePayload;
        const movieSpy = jest.spyOn(MOVIE,'create').mockReturnValue(Promise.reject('error occuring!'))
        //act
        await movieController.createMovies(req,res)
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"Internal server error!"            })
        )
    })
  })
  describe('movie filter test',()=>{
    it('get all movie should pass',async ()=>{
            //arrange
           const req = mockRequest();
           const res = mockResponse();
           const movieSpy  = jest.spyOn(MOVIE,'find').mockReturnValue(Promise.resolve([moviePayload]))

            //act
          await movieController.movieFilter(req,res);
            //asserts
            expect(movieSpy).toBeCalled()
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.send).toHaveBeenCalledWith(
                expect.objectContaining({
                    Movies:expect.arrayContaining([
                        moviePayload
                    ])
                })
            )
    })
    it('get  movie by name should pass',async ()=>{
        //arrange
       const req = mockRequest();
       const res = mockResponse();
       req.query = {
        name:"DHAMAL test"
       }
       const movieSpy  = jest.spyOn(MOVIE,'find').mockReturnValue(Promise.resolve([moviePayload]))
        //act
      await movieController.movieFilter(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                Movies:expect.arrayContaining([
                    moviePayload
                ])
            })
        )
})
it('get  movie by id should pass',async ()=>{
    //arrange
   const req = mockRequest();
   const res = mockResponse();
   req.query = {
    id:"1"
   }
   const movieSpy  = jest.spyOn(MOVIE,'find').mockReturnValue(Promise.resolve([moviePayload]))
    //act
  await movieController.movieFilter(req,res);
    //asserts
    expect(movieSpy).toBeCalled()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            Movies:expect.arrayContaining([
                moviePayload
            ])
        })
    )
})
it('get  movie should fail',async ()=>{
    //arrange
   const req = mockRequest();
   const res = mockResponse();
   const movieSpy  = jest.spyOn(MOVIE,'find').mockReturnValue(Promise.reject('error occuring'))
    //act
  await movieController.movieFilter(req,res);
    //asserts
    expect(movieSpy).toBeCalled()
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            message:"Internal server error"
        })
    )
})
})

describe('movie update test',()=>{
    it('movie update name by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            name:"hello"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update description by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            description:"hello world"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update release date by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            releaseDate:"12/01/2022"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update release Status by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            releaseStatus:"BLOCK"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update director by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            director:"vishal roy"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update language by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            language:"English"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update movie image  by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            movieImage:"xyxyxyxy"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update price  by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            price:"5422"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update trailer video  by id should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            trailerVideo:"xyz"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(moviePayload))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"movie update successfully!"
            })
        )
    })
    it('movie update should fail',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            trailerVideo:"xyz"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.reject("error occuring!"))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"Internal server error!"
            })
        )
    })
    it('movie update should fail due to movie not found',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params = {
            id:1
        }
        req.body = {
            trailerVideo:"xyz"
        } 
        const movieSpy = jest.spyOn(MOVIE,'findOne').mockReturnValue(Promise.resolve(null))
        //act
        await movieController.updateMovie(req,res);
        //asserts
        expect(movieSpy).toBeCalled()
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message:"Movie does not exists!"
            })
        )
    })
})
describe('movie delete test',()=>{
    it('movie delete should pass',async ()=>{
        //arrange 
        const req = mockRequest()
        const res = mockResponse()
        req.params = {
                id:"1"
        }
        const movieSpy = jest.spyOn(MOVIE,'findOneAndDelete').mockReturnValue(Promise.resolve(moviePayload))
      //act
      await movieController.deleteMovie(req,res);
      //asserts
      expect(movieSpy).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            message:"movie deleted successfully!"
        })
      )
    
    })
    it('movie delete should fail due to movie not found',async ()=>{
        //arrange 
        const req = mockRequest()
        const res = mockResponse()
        req.params = {
                id:"1"
        }
        const movieSpy = jest.spyOn(MOVIE,'findOneAndDelete').mockReturnValue(Promise.resolve(null))
      //act
      await movieController.deleteMovie(req,res);
      //asserts
      expect(movieSpy).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(404)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            message:"movie already deleted!"
        })
      )
    
    })
    it('movie delete should fail due to internal error',async ()=>{
        //arrange 
        const req = mockRequest()
        const res = mockResponse()
        req.params = {
                id:"1"
        }
        const movieSpy = jest.spyOn(MOVIE,'findOneAndDelete').mockReturnValue(Promise.reject("error occuring!"))
      //act
      await movieController.deleteMovie(req,res);
      //asserts
      expect(movieSpy).toBeCalled();
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.send).toHaveBeenCalledWith(
        expect.objectContaining({
            message:"internal server error!"
        })
      )
    })
})