const Movie=require('./models/movie.model');
const Theatre= require('./models/theatre.model');

exports.movieData=async(req,res)=>{
    await Movie.create({
        movieItem:"bollywood",
        name:"sole",
        description:"bollywood hindi movie",
        releaseDate:"12/12/1995",
        releaseStarus:"RELEASED",
        director:"vinay",
        language:"hindi",
    })
}

exports.theatreData=async(req,res)=>{
    await Theatre.create({
        name:"Tulsi",
        description:"bollywood hindi movie",
        city:"Lucknow",
        pinCode:"226001",
    })
}