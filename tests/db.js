const mongoose = require("mongoose");
const { MongodbMemoryServer, MongoMemoryReplSet, MongoMemoryServer } = require("mongodb-memory-server");

let db;

exports.connect = async() => {
    if (!db) {
        db = await MongoMemoryServer.create();
        const uri = db.getUri();
        await mongoose.connect(uri);

    }
}

exports.closeDatabase = async() => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (db) {
        await db.stop();
    }
}

exports.clearDatabase = async() => {
    const collections = mongoose.connection.collections;
    for (let key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}