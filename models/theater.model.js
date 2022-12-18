const mongoose = require('mongoose');

const theaterSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true
    },
    description : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true,
        minlength : 6
    }
},
    {timestamps : true}
)

module.exports = mongoose.model("Theater", theaterSchema)