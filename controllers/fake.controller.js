const movieModel = require('../models/movie.model')
const  movieSeed = require('../seeders/movie.seed');
const createMovie = async (data)=>{
    for(let i=0;i<data.length;i++){
        await movieModel.create(data[i])
    }
}
createMovie(movieSeed.fakeMovie)