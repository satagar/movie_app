'use strict';
const userSeeder = require("./user.seeder");
const { dbConnect } = require("../helpers");

let exitAfterSeeding = false;

module.exports = {
    seedAll: async () => {
        await dbConnect().then(async () => {
            await userSeeder.seed(1);
        }).catch(err => console.log(`Failed to run seeders because:\n${err}`));
        if(exitAfterSeeding) process.exit();
    }
}

if(process.argv.includes('seed')) {
    exitAfterSeeding = true;
    module.exports.seedAll();
}