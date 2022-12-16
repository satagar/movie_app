const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const connectDB = require('./db/connect');

const port = process.env.port || 3000 ;

const result = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,() => console.log(`Movie Booking Portal listening on port ${port}`)
        );
    }catch(err){
        console.log(err);
    }
};

result();