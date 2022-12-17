const Movie=require('./models/movie.model');

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