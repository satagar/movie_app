const { faker } = require("@faker-js/faker");
const { register, login } = require("../../../controllers/auth.controller");
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

describe('register', () => {

    it('should respond 201 on success with created object', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await register(req, res);

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
        const spyUserCreate = jest.spyOn(User, 'create').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await register(req, res);

        // assert
        expect(spyUserCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('login', () => {

    it('should respond 200 on success with accessToken and refreshToken', async () => {

        // arrange
        const spyUserAuthenticate = jest.spyOn(User, 'authenticate').mockResolvedValue(new User(payload));
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await login(req, res);

        // assert
        expect(spyUserAuthenticate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                accessToken: expect.any(String),
                refreshToken: expect.any(String)
            })
        );
    })

    it('should respond 401 on failure with error message', async () => {

        // arrange
        const spyUserAuthenticate = jest.spyOn(User, 'authenticate').mockRejectedValue(false);
        const req = mockRequest();
        const res = mockResponse();
        req.body = payload;

        // act
        await login(req, res);

        // assert
        expect(spyUserAuthenticate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});
