const movieModel = require('../models/movie.model');

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
                return res.status(500).send({
                    message:"Movie created successfully!",
                    created_Movie:movies
                })
          }catch(err){
             console.log(err.message)
            return res.status(500).send({
                message:"Internal server error!"
            })
          }
}