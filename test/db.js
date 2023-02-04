const {
    MongoMemoryServer
} = require('mongodb-memory-server');
const {
    default: mongoose
} = require('mongoose');
let mongod;
exports.connectDB = async () => {
    if (!mongod) {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        await mongoose.connect(uri)
    }
}
exports.clearDB = async () => {
    const collection = mongoose.connection.collections
    for (let key in collection) {
        const data = collection[key];
        await data.deleteMany()
    }
}
exports.closeDB = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
    if (mongod) {
        await mongod.stop()
    }
}