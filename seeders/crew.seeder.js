const { faker } = require('@faker-js/faker');
const { Crew } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Crew.deleteMany();
        for(let i = 0; i < count; i++) {
            await Crew.create({
                name: faker.name.fullName(),
                imageUrl: faker.image.imageUrl(),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}