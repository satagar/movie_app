const UserModel = require("../../Models/user.model");
const { signup, Login } = require("../../Controllers/auth.controller");
const { connect, closeDatabase, clearDatabase } = require("../db");
var bcrypt = require('bcrypt');
const { mockRequest, mockResponse } = require("../intreceptor");

const testPayload = {
    name: "Test",
    userId: "1",
    emailId: "test@relevel.com",
    password: "pwd",
    role: "CUSTOMER",
    userStatus: "APPROVED"
}

beforeAll(async() => { await connect() });
beforeEach(async() => { await clearDatabase() });
afterAll(async() => { await closeDatabase() });

describe('signup', () => {
    it('success', async() => {
        //Arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = testPayload;

        //Act
        await signup(req, res);

        //Assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(
            // expect.objectContaining({
            //userResp: 
            expect.objectContaining({
                "emailId": "test@relevel.com",
                "name": "Test",
                "userId": "1",
                "userStatus": "APPROVED",
                "role": "CUSTOMER"
            })

            //         })
        )
    })
});