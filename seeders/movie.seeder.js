const { faker } = require('@faker-js/faker');
const { Movie, Crew, Genre, Review } = require("../models");

module.exports = {
    seed: async (count = 1) => {
        await Movie.deleteMany();
        for(let i = 0; i < count; i++) {
            await Movie.create({
                title: `The ${faker.word.adjective()} ${faker.word.noun()}`,
                about: faker.lorem.sentence(),
                posterUrl: faker.image.imageUrl(),
                trailerUrl: faker.internet.url(),
                runtime: faker.datatype.number({ min: 90, max: 180 }),
                cbfcCertification: faker.helpers.arrayElement(Movie.cbfcCertifications),
                releaseDate: faker.date.future(),
                status: faker.helpers.arrayElement(Movie.statuses),
                genres: await Genre.aggregate([{ $sample: { size: faker.datatype.number({ min: 1, max: 2 })}}]),
                directors: await Crew.aggregate([{ $sample: { size: 1 } }]),
                writers: await Crew.aggregate([{ $sample: { size: 1 } }]),
                cast: await Crew.aggregate([{ $sample: { size: faker.datatype.number({ min: 5, max: 7 })}}]),
                reviews: await Review.aggregate([{ $sample: { size: faker.datatype.number({ min: 5, max: 15 })}}]),
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}