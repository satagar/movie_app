const { faker } = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const { index, create, read, update, destroy } = require("../../../controllers/theater.controller");
const { Theater } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => await connect());
beforeEach(async () => await clear());
afterAll(async () => await close());

const payload = {
    _id: '6378a804b5bbfec8ae71acb3',
    name: `${faker.word.noun()} Cinemas`,
    description: faker.lorem.sentence(),
    city: faker.address.city(),
    pincode: faker.datatype.number({ min: 100000, max: 999999 }),
    address: faker.address.streetAddress(),
    coordinates: faker.address.nearbyGPSCoordinate(),
    facilities: faker.helpers.uniqueArray(Theater.facilities, 2),
    refundsEnabled: faker.datatype.boolean(),
    owner: '1378a804b5bbfec8ae71acb3'
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
        const spyFind = jest.spyOn(Theater, 'find').mockResolvedValue([
            new Theater(payload)
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
                    description: payload.description,
                    city: payload.city,
                    pincode: payload.pincode,
                    address: payload.address,
                    coordinates: payload.coordinates,
                    facilities: payload.facilities,
                    refundsEnabled: payload.refundsEnabled
                })
            ])
        );
    })

    it('should respond 500 on failure with error message', async () => {
        // arrange
        const spyFind = jest.spyOn(Theater, 'find').mockRejectedValue('error');
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
        req.user.id = payload.owner;

        // act
        await create(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: payload.name,
                description: payload.description,
                city: payload.city,
                pincode: payload.pincode,
                address: payload.address,
                coordinates: payload.coordinates,
                facilities: payload.facilities,
                refundsEnabled: payload.refundsEnabled
            })
        );
    })

    it('should respond 500 on failure with error message', async () => {

        // arrange
        const spyCreate = jest.spyOn(Theater, 'create').mockRejectedValue('error');
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
        const spyFindById = jest.spyOn(Theater, 'findById').mockResolvedValue(new Theater(payload));
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
                description: payload.description,
                city: payload.city,
                pincode: payload.pincode,
                address: payload.address,
                coordinates: payload.coordinates,
                facilities: payload.facilities,
                refundsEnabled: payload.refundsEnabled
            })
        );
    })

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Theater, 'findById').mockResolvedValue(null);
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
        const spyFindById = jest.spyOn(Theater, 'findById').mockRejectedValue('error');
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
        const spyFindById = jest.spyOn(Theater, 'findOne').mockResolvedValue(new Theater(payload));
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
                description: payload.description,
                city: payload.city,
                pincode: payload.pincode,
                address: payload.address,
                coordinates: payload.coordinates,
                facilities: payload.facilities,
                refundsEnabled: payload.refundsEnabled
            })
        );
    })

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Theater, 'findOne').mockResolvedValue(null);
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
        const spyFindById = jest.spyOn(Theater, 'findOne').mockRejectedValue('error');
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
        const spyFindById = jest.spyOn(Theater, 'findById').mockResolvedValue(new Theater(payload));
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
                description: payload.description,
                city: payload.city,
                pincode: payload.pincode,
                address: payload.address,
                coordinates: payload.coordinates,
                facilities: payload.facilities,
                refundsEnabled: payload.refundsEnabled
            })
        );
    })

    it('should respond 404 on data null with error message', async () => {

        // arrange
        const spyFindById = jest.spyOn(Theater, 'findById').mockResolvedValue(null);
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
        const spyFindById = jest.spyOn(Theater, 'findById').mockRejectedValue('error');
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