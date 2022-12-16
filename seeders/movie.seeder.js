const { faker } = require('@faker-js/faker');
const { Movie } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Movie.deleteMany();
        for(let i = 0; i < count; i++) {
            await Movie.create({
                title: `The ${faker.word.adjective()} ${faker.word.noun()}`,
                about: faker.lorem.sentence(),
                posterUrl: faker.image.imageUrl(),
                trailerUrl: faker.internet.url(),
                runtime: faker.internet.email(),
                cbfcCertification: faker.helpers.arrayElement(Movie.cbfcCertifications),
                releaseDate: faker.date.future(),
                status: faker.helpers.arrayElement(Movie.statuses),
                genres: [],
                directors: [],
                writers: [],
                cast: [],
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}