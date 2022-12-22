const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
require('./routes/movie.routes')
require('./routes/theatre.routes')
const DB = require('./configs/db.config')
const app = express()
const PORT = process.env.PORT || 3000
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
mongoose.connect(DB.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true }, (err) => {
    if (!err) {
        console.log("DB connected")
    } else {
        console.log(err.message)
    }
})
app.listen(PORT, () => {
    console.log("Server connected on port ${PORT}")
})