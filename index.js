const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./Configs/dbConfig");
const seeders = require('./fakeData/fakeDataCreation')
require("dotenv").config();

const userRoute = require("./Routes/auth.Routes/auth.routes");
const MovieRoute = require("./Routes/Movie.Routes/movie.routes");
const TheatreRoute = require("./Routes/Theatre.Routes/theatre.routes");
const BookingRoute = require("./Routes/Booking.Routes/booking.routes");
const PaymentRoute = require("./Routes/Payment.Routes/payment.routes");


const app = express();
const Port = process.env.PORT;

app.use(express.json())

mongoose.connect(dbConfig.DB_URL, { family: 4 }, (error) => {
    if (error) {
        console.log(`Error Occured in connection ${error}`)
    } else {
        console.log('Node Environment :', process.env.NODE_ENV);
        console.log('Connection Successful to DB server:', dbConfig.DB_NAME);
        seeders.fakeSeeders();
        app.use("/", userRoute, MovieRoute, TheatreRoute, BookingRoute, PaymentRoute);

        app.listen(Port, () => {
            console.log(`App is listening at port : ${Port}`)
        })
    }
})