const { faker } = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const { index, create, read, update, destroy } = require("../../../controllers/movie.controller");
const { Movie } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => await connect());
beforeEach(async () => await clear());
afterAll(async () => await close());

const payload = {
    _id: '6378a804b5bbfec8ae71acb3',
    name: `The ${faker.word.adjective()} ${faker.word.noun()}`,
    about: faker.lorem.sentence(),
    posterUrl: faker.image.imageUrl(),
    trailerUrl: faker.internet.url(),
    runtime: faker.internet.email(),
    cbfcCertification: faker.helpers.arrayElement(Movie.cbfcCertifications),
    releaseDate: faker.date.future(),
    status: faker.helpers.arrayElement(Movie.statuses),
    genres: ['1378a804b5bbfec8ae71acb3', '2378a804b5bbfec8ae71acb3'],
    directors: ['1378a804b5bb4ec8ae71acb3'],
    writers: ['1378a804b7bb4ec8ae71acb3'],
    cast: ['4378a804b5bbfec8ae71acb3', '5378a804b5bbfec8ae71acb3', '6378a804b5bbfec8ae71acb3', '7378a804b5bbfec8ae71acb3'],
};

describe('index', () => {
    it('should respond 200 on success with empty array', async () => {
        // arrange
        const req = mockRequest();
        const res = mockResponse();
        
        // act
        await index(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([])
        );
    })

    it('should respond 200 on success with array of objects', async () => {
        // arrange
        const spyFind = jest.spyOn(Movie, 'find').mockResolvedValue([
            new Movie(payload)
        ]);
        const req = mockRequest();
        const res = mockResponse();
        
        // act
        await index(req, res);

        // assert
        expect(spyFind).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.objectContaining({
                    _id: mongoose.Types.ObjectId(payload._id),
                    name: payload.name,
                    email: payload.email,
                    role: 'customer'
                })
            ])
        );
    })

    it('should respond 500 on failure with error message', async () => {
        // arrange
        const spyFind = jest.spyOn(Movie, 'find').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        
        // act
        await index(req, res);

        // assert
        expect(spyFind).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('create', () => {
    it('should respond 201 on success with created object', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await create(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: payload.name,
                email: payload.email,
                role: 'customer'
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyCreate = jest.spyOn(Movie, 'create').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await create(req, res);

        // assert
        expect(spyCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('read', () => {
    it('should respond 200 on success with requested object', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockResolvedValue(new Movie(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await read(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: mongoose.Types.ObjectId(payload._id),
                name: payload.name,
                email: payload.email,
                role: 'customer'
            })
        );
    })

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockResolvedValue(null);
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await read(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 404 on invalid id with error message', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = 1;

        // act
        await read(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await read(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('update', () => {
    it('should respond 200 on success with requested object', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockResolvedValue(new Movie(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.body = payload;

        // act
        await update(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: mongoose.Types.ObjectId(payload._id),
                name: payload.name,
                email: payload.email,
                role: 'customer'
            })
        );
    })

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockResolvedValue(null);
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await update(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 404 on invalid id with error message', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = 1;

        // act
        await update(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;

        // act
        await update(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('destroy', () => {
    it('should respond 200 on success with requested object', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockResolvedValue(new Movie(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.Movie.id = 1;

        // act
        await destroy(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                _id: mongoose.Types.ObjectId(payload._id),
                name: payload.name,
                email: payload.email,
                role: 'customer'
            })
        );
    })

    it('should respond 400 on trying to delete self', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.Movie.id = payload._id;

        // act
        await destroy(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockResolvedValue(null);
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.Movie.id = 1;

        // act
        await destroy(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 404 on invalid id with error message', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = 1;

        // act
        await destroy(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Movie, 'findById').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.Movie.id = 1;

        // act
        await destroy(req, res);

        // assert
        expect(spyFindById).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});