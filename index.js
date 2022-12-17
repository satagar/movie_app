const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./Configs/dbConfig");
require("dotenv").config();
const route = require("./Routes/auth.routes");
const app = express();
const Port = process.env.PORT;

app.use(express.json())

mongoose.connect(dbConfig.DB_URL, { family: 4 }, (error) => {
    if (error) {
        console.log(`Error Occured in connection ${error}`)
    } else {
        console.log('Node Environment :', process.env.NODE_ENV);
        console.log('Connection Successful to DB server:', dbConfig.DB_NAME);

        app.use("/", route);

        app.listen(Port, () => {
            console.log(`App is listening at port : ${Port}`)
        })
    }
})