const mongoose=require('mongoose');

const movieSchema= new mongoose.Schema({

    movieId:{
        type:String,
        required:true
    },
    movieItem:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    releaseDate:{
        type:String,
        required:true
    },
    releaseStarus:{
        type:String,
        enum:["UNRELEASED","RELEASED","BLOCKED"]
    },
    director:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    casts:{
        type:[String],
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    createdAt:{
        type:String,
        default:()=>{
            return Date.now();
        },
        immutable: true
    },
    updatededAt:{
        type:String,
        default:()=>{
            return Date.now();
        }
    }
})

module.exports=mongoose.model('movie',movieSchema);