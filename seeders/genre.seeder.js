const { Genre } = require("../models");

module.exports = {
    seed: async (names) => {
        await Genre.deleteMany();
        for(const name of names) {
            await Genre.create({
                name: name
            }).then(data => {
                console.log(`Seeded: ${data}`)
            }).catch(err => console.log(`Error seeding: ${err}`));
        }
    }
}