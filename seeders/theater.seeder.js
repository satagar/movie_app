const { faker } = require('@faker-js/faker');
const { Theater, User } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Theater.deleteMany();
        for(let i = 0; i < count; i++) {
            await Theater.create({
                name: `${faker.word.noun()} Cinemas`,
                description: faker.lorem.sentence(),
                city: faker.address.city(),
                pincode: faker.datatype.number({ min: 100000, max: 999999 }),
                address: faker.address.streetAddress(),
                coordinates: faker.address.nearbyGPSCoordinate(),
                facilities: faker.helpers.uniqueArray(Theater.facilities, 2),
                refundsEnabled: faker.datatype.boolean(),
                owner: (await User.aggregate([{ $match: { role: 'client' } },{ $sample: { size: 1 } }])).find(() => true),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}