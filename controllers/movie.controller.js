const movieModel = require('../models/movie.model');
const  movieSeed = require('../seeders/movie.seed');

exports.createMovies = async (req,res)=>{
          const body = req.body
          const movie = {
            name:body.name,
            description:body.description,
            releaseDate:body.releaseDate,
            releaseStatus:body.releaseStatus,
            director:body.director,
            language:body.language,
            movieImage:body.movieImage,
            price:body.price,
            trailerVideo:body.trailerVideo
          }
          try{
                const movies = await movieModel.create(movie)
                return res.status(201).send({
                    message:"Movie created successfully!",
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
        const finded = await movieModel.find(find)
        return res.status(200).send({
            Movies : finded
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
        const find = await movieModel.findOne({_id:id})
        if(!find){
            return res.status(400).send({
                message:"Movie does not exists!"
            })
        }
        if(body.name){
            find.name = body.name
        }
        if(body.description){
            find.description = body.description
        }
        if(body.releaseDate){
            find.releaseDate = body.releaseDate
        }
        if(body.releaseStatus){
            find.releaseStatus = body.releaseStatus
        }
        if(body.director){
            find.director = body.director
        }
        if(body.language){
            find.language = body.language
        }
        if(body.movieImage){
            find.movieImage = body.movieImage
        }
        if(body.price){
            find.price = body.price
        }
        if(body.trailerVideo){
            find.trailerVideo = body.trailerVideo
        }
       await find.save()
       return res.status(201).send({
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
        const movie = await movieModel.findOneAndDelete({_id:id});
        if(!movie){
            return res.status(400).send({
                message:"movie already deleted!"
            })
        }
        return res.status(201).send({
            message:"movie deleted successfully!"
        })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"internal server error!"
        })
    }
}
const createMovie = async (data)=>{
    for(let i=0;i<data.length;i++){
        await movieModel.create(data[i])
    }
    console.log('fake movie created')
}
// createMovie(movieSeed.fakeMovie)