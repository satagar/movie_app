const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    releaseDate:{
        type:String,
        require:true
    },
    releaseStatus:{
        type:String,
        default:"RELEASED",
        enum:['RELEASED','UPCOMING','BLOCK']
    },
    director:{
        type:String,
        require:true
    },
    language:{
        type:String,
        default:'HINDI'
    },
    movieImage:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    trailerVideo:{
        type:String
    },
    theaterId:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:'theater'
    },
    createAt:{
        type:String,
        default:()=>{
            return Date.now()
        },
        immutable:true
    },
    updatedAt:{
        type:String,
        default:()=>{
            return Date.now()
        }
    }
})

const movieModel = mongoose.model('movies',movieSchema)
module.exports = movieModel;