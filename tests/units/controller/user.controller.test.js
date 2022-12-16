const { faker } = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const { index, create, read, update, destroy } = require("../../../controllers/user.controller");
const { User } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => await connect());
beforeEach(async () => await clear());
afterAll(async () => await close());

const payload = {
    _id: '6378a804b5bbfec8ae71acb3',
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.random.alphaNumeric(6)
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
        const spyFind = jest.spyOn(User, 'find').mockResolvedValue([
            new User(payload)
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
        const spyFind = jest.spyOn(User, 'find').mockRejectedValue('error');
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
        const spyCreate = jest.spyOn(User, 'create').mockRejectedValue('error');
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
        const spyFindById = jest.spyOn(User, 'findById').mockResolvedValue(new User(payload));
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
        const spyFindById = jest.spyOn(User, 'findById').mockResolvedValue(null);
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
        const spyFindById = jest.spyOn(User, 'findById').mockRejectedValue('error');
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
        const spyFindById = jest.spyOn(User, 'findById').mockResolvedValue(new User(payload));
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
        const spyFindById = jest.spyOn(User, 'findById').mockResolvedValue(null);
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
        const spyFindById = jest.spyOn(User, 'findById').mockRejectedValue('error');
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
        const spyFindById = jest.spyOn(User, 'findById').mockResolvedValue(new User(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.user.id = 1;

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
        req.user.id = payload._id;

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
        const spyFindById = jest.spyOn(User, 'findById').mockResolvedValue(null);
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.user.id = 1;

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
        const spyFindById = jest.spyOn(User, 'findById').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.params.id = payload._id;
        req.user.id = 1;

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