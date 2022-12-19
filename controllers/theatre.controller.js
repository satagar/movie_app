const Theatre = require('../models/theatre.model');
const Movie = require('../models/movie.model');

const createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        description: req.body.description,
        city: req.body.city,
        pincode: req.body.pincode
    }
    try{
        const theatre = await Theatre.create(theatreObject);
        res.status(201).send(theatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in creating theatre. Please try again after sometime!"
        });
    }
}

const getAllTheatres = async (req, res) => {
    const condition = {};
    if(req.query.name){
        condition.name = req.query.name;
    }
    if(req.query.city){
        condition.city = req.query.city;
    }
    if(req.query.pincode){
        condition.pincode = req.query.pincode;
    }
    try{
        let theatres = await Theatre.find(condition);
        if(req.body.movieId){
            threatres = theatres.filter(theatre => theatre.movies.includes(movieId));
        }
        res.status(200).send(theatres);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching theatres. Please try again after sometime!"
        });
    }
}

const getTheatreById = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id: req.params.id});
        if(!theatre){
            return res.sendStatus(404);
        }
        res.status(200).send(theatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching theatre. Please try again after sometime!"
        });
    }
}

const updateTheatre = async (req, res) => {
    try{
        let theatre = await Theatre.findOne({_id: req.params.id});
        if(!theatre){
            return res.status(404).send({
                message: "Theatre being updated doesn't exist"
            });
        }
        const updatetheatreObject = {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            pincode: req.body.pincode
        }
        const updatedTheatre = await Theatre.updateOne( {_id: req.params.id}, updatetheatreObject);
        res.status(200).send(updatedTheatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in updating theatre. Please try again after sometime!"
        });
    }
}

const deleteTheatre = async (req, res) => {
    try{
        await Theatre.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: `Successfully delete theatre with id ${req.params.id}`
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in deletion. Please try again after sometime!"
        });
    }
}

const addMoviesToATheatre = async (req, res) => {
    const movieIds = req.body.movieIds;
    const insert = req.body.insert;
    try{
        const theatre = await Theatre.findOne({_id: req.params.id});
        for(let i = 0; i < movieIds.length; i++){
            if(insert){
                theatre.movies.push(movieIds[i]);
            }else{
                theatre.movies = theatre.movies.filter(mi => mi != movieIds[i]);
            }
        }
        await theatre.save();
        res.status(200).send(theatre);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: `Error while ${insert? `updating`: `deleting`}. Please try again after sometime!`
        });
    }
}

const checkMovieInsideATheatre = async (req, res) => {
    try{
        const theatre = await Theatre.findOne({_id: req.params.theatreId});
        if(!theatre){
            return res.status(404).send({
                message: "Your theatre doesn't exists!"
            });
        }
        const movie = await Movie.findOne({_id: req.params.movieId});
        if(!movie){
            return res.status(404).send({
                message: "Your movie doesn't exists!"
            });
        }
        res.status(200).send({
            message: theatre.movies.includes(movie._id)? `${movie.name} is present in your ${theatre.name}`: `${movie.name} is not present in your ${theatre.name}` 
        });
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed! some error occured. Please try again after some time!"
        });
    }
}

module.exports = {
    createTheatre,
    getAllTheatres,
    getTheatreById,
    updateTheatre,
    deleteTheatre,
    addMoviesToATheatre,
    getAllTheatres,
    checkMovieInsideATheatre
}