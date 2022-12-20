const { faker } = require("@faker-js/faker");
const supertest = require("supertest");
const server = require("../../..");
const { connect, clear, close } = require("../../db");

beforeAll(async () => {
    await clear();
});
afterAll(async () => { 
    await close();
    server.close(); 
});

const baseUrl = '/api';

describe('register', () => {

    const payload = {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(6)
    }

    it('should respond 201 on success with created object', async () => {
        const res = await supertest(server).post(`${baseUrl}/register`).send(payload);
        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(
            expect.objectContaining({
                name: payload.name,
                email: payload.email,
                role: 'customer'
            })
        );
    })
});