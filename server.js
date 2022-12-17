const serverConfig = require('./configs/server.config');
const dbConfig = require('./configs/db.config');
const mongoose = require('mongoose');
const express = require('express');
const parenRouter = require('./routes/parent.routes');
const app = express();

app.use(express.json());

mongoose.connect(dbConfig.DB_URL, (err) => {
    if(err){
        console.log(err.mssage);
    }
    console.log("connected to DB");
});

parenRouter(app);

app.listen(serverConfig.PORT, serverConfig.HOST, () => {
    console.log(`Server is running on ${serverConfig.HOST}:${serverConfig.PORT}`);
});