const Movie =require('../models/movie.model')

exports.createMovie= async(req,res)=>{
    const body = req.body;
    const movieObj ={
        movieItem:body.movieItem,
        name:body.name,
        description:body.description,
        releaseDate:body.releaseDate,
        releaseStarus:body.releaseStarus,
        director:body.director,
        language:body.language,
    }
    try {
            const movie = await Movie.create(movieObj);
            res.status(201).send(movie);

    } catch (error) {
        res.status(500).send({
            massage:'Error Occured!'
        })
    }
}

