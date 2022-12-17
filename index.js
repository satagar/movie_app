const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const DB = require('./configs/db.config')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
mongoose.connect(process.env.DB.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB connected")
    } else {
        console.log(err.message)
    }
})
app.listen(DB.PORT)