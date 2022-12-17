const express = require('express')
const mongoose = require('mongoose');
const app = express();
const serverConfig = require('./config/server.config');
const { createRoutes } = require('./routes/parent.router');

app.use(express.json());

mongoose.connect('mongodb://localhost/movie_booking', {family : 4}, (err) => {
    if(err) {
        console.log(`error occured during server connection!`);
    }
    else {
        console.log('connected')
        app.listen(serverConfig.PORT, serverConfig.HOST, () => {
            console.log(`server is listening on ${serverConfig.HOST} : ${serverConfig.PORT}`);
        });
    }
});

createRoutes(app);

app.get("/", (req, res) => {
    res.send(`"A Wink Away" Movie booking application`)   
});
