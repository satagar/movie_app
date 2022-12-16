const { faker } = require('@faker-js/faker');
const { Review, User } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Review.deleteMany();
        for(let i = 0; i < count; i++) {
            await Review.create({
                user: (await User.aggregate([{ $match: { role: 'customer' } },{ $sample: { size: 1 } }])).find(() => true),
                review: faker.lorem.paragraph(),
                rating: faker.datatype.number({ min: 1, max: 5 }),
                recommends: faker.datatype.boolean(),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}