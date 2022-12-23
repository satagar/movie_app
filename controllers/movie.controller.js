const MOVIE = require('../models/movie.model');
const  movieSeed = require('../seeders/movie.seed');

exports.createMovies = async (req,res)=>{
          const body = req.body
          const movie = {
            name:body.name,
            description:body.description,
            releaseDate:body.releaseDate,
            releaseStatus:body.releaseStatus.toUpperCase(),
            director:body.director,
            language:body.language,
            movieImage:body.movieImage,
            price:body.price,
            trailerVideo:body.trailerVideo
          }
          try{
                const movies = await MOVIE.create(movie)
                return res.status(201).send({
                    message:"Movie created successfully!",
                    Created_Movie : movies
                })
          }catch(err){
             console.log(err.message)
            return res.status(500).send({
                message:"Internal server error!"
            })
          }
}

exports.movieFilter = async (req,res)=>{
    const find = {};
    const query = req.query;
    if(query.id){
           find._id = query.id
    }
    if(query.name){
        find.name = {
            $regex:query.name
        }
    }
    try{
        const movie = await MOVIE.find(find)
        return res.status(200).send({
            Movies : movie
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error"
        })
    }
}
exports.updateMovie = async (req,res)=>{
    const id = req.params.id
    const body = req.body;
    try{ 
        const movie = await MOVIE.findOne({_id:id})
        if(!movie){
            return res.status(404).send({
                message:"Movie does not exists!"
            })
        }
        if(body.name){
            movie.name = body.name
        }
        if(body.description){
            movie.description = body.description
        }
        if(body.releaseDate){
            movie.releaseDate = body.releaseDate
        }
        if(body.releaseStatus){
            movie.releaseStatus = body.releaseStatus
        }
        if(body.director){
            movie.director = body.director
        }
        if(body.language){
            movie.language = body.language
        }
        if(body.movieImage){
            movie.movieImage = body.movieImage
        }
        if(body.price){
            movie.price = body.price
        }
        if(body.trailerVideo){
            movie.trailerVideo = body.trailerVideo
        }
       await movie.save()
       return res.status(200).send({
        message:"movie update successfully!"
    })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}
exports.deleteMovie = async (req,res)=>{
    const id = req.params.id
    try{
        const movie = await MOVIE.findOneAndDelete({_id:id});
        if(!movie){
            return res.status(404).send({
                message:"movie does not exists!"
            })
        }
        return res.status(200).send({
            message:"movie deleted successfully!"
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"internal server error!"
        })
    }
}
//----------------------uncomment id need seed data -------------------
// const createMovie = async (data)=>{
//     for(let i=0;i<data.length;i++){
//         await MOVIE.create(data[i])
//     }
//     console.log('fake movie created')
// }
// createMovie(movieSeed.fakeMovie)