const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const DB = require('./configs/db.config')
const app = express()
app.get('/', (req, res) => {
    res.send(" <h1>This is Home Page!</h1>")
})
//app.use(movieRoutes)
//app.use(theatreRoutes)
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
require('./routes/movie.routes')(app)
require('./routes/theatre.routes')(app)
require('./routes/user.routes')(app)
app.listen(PORT, () => {
    console.log("Server connected on port:", PORT)
})