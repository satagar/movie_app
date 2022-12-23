const Movie =require('../models/movie.model')
const movieSeed=require('../seeders/movie.seed');

exports.createMovie= async(req,res)=>{
    const body = req.body;
    const movieObj ={
        movieItem:body.movieItem,
        name:body.name,
        description:body.description,
        releaseDate:body.releaseDate,
        releaseStarus:body.releaseStarus,
        casts:body.casts,
        posterUrl:body.posterUrl,
        
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

exports.getAllMovies = async (req, res) => {
    const condition = {};
    if(req.query.name){
        condition.name = req.query.name;
    }
    if(req.query.id){
        condition.id = req.query.id;
    }
    try{
        const movies = await Movie.find(condition);
        res.status(200).send(movies);
    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message: "Failed in fetching movies!"
        });
    }
}

exports.getMovieById= async (req, res) => {
    try{
        const movie = await Movie.findOne({_id: req.params.id});
        if(!movie){
            return res.sendStatus(404);
        }
        res.status(200).send(movie);
    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message: "Failed in fetching movie!"
        });
    }
}

exports.updateMovie = async (req, res) => {
    try{
        let movie = await Movie.findOne({_id: req.params.id});
        if(!movie){
            return res.status(404).send({
                message: "Movie being updated doesn't exist"
            });
        }
        const updateMovieObj = {
            movieItem:body.movieItem,
            name:body.name,
            description:body.description,
            releaseDate:body.releaseDate,
            releaseStarus:body.releaseStarus,
            director:body.director,
            language:body.language,
        }
        const updatedMovie = await Movie.updateOne( {_id: req.params.id}, updateMovieObj);
        res.status(200).send(updatedMovie);
    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message: "Failed in updating movie!"
        });
    }
}

exports.deleteMovie = async (req, res) => {
    try{
        await Movie.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: `Successfully delete movie with id ${req.params.id}`
        });
    }catch(error){
        console.log(error.message);
        res.status(500).send({
            message: "Failed in deletion!"
        });
    }
}

const createMovies = async (data)=>{
    for(let i=0;i<data.length;i++){
        await Movie.create(data[i])
    }
    console.log('fake movie created')
}
createMovies(movieSeed.movieData)