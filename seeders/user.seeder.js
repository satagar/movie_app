const { faker } = require('@faker-js/faker');
const { User } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await User.deleteMany();
        for(let i = 0; i < count; i++) {
            await User.create({
                name: faker.name.fullName(),
                email: faker.internet.email(),
                password: '123456',
                role: 'admin'
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}