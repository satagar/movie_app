const Theatre = require('../models/theatre.model');
// const theatreSeed=require('../seeders/theatre.seed');

exports.createTheatre = async (req,res)=>{
    const body= req.body;
    const theatreObj={
        name:body.name,
        description:body.description,
        city:body.city,
        pinCode:body.pinCode,
    }
    try {
        const theatre= await Theatre.create(theatreObj)
        res.status(201).send(theatre);
    } catch (error) {
        res.status(500).send({
            massage:'Error Occured!'
        })
    }
}

exports.getTheatreById=async(req,res)=>{
    try {
        const theatre= await Theatre.findOne({_id:req.params.id})
        if(!theatre){
            return res.sendStatus(404);
        }
        res.status(201).send(theatre);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            massage:'Failed in fetching Theatre!'
        })
    }
}

exports.grtAlltheatre= async (req,res)=>{
    const condition = {};
    const body= req.body;
    if(req.query.name){
        condition.name = req.query.name;
    }
    if(req.query.id){
        condition.id = req.query.id;
    }
    if(req.query.city){
        condition.city = req.query.city;
    }
    if(req.query.pincode){
        condition.pincode = req.query.pincode;
    }
    try{
        const theatres = await Theatre.find(condition);
        res.status(200).send(theatres);
    }catch(err){
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching Theatre!"
        });
    }
}

exports.updateTheatre= async(req,res)=>{
    try {
        let theatre = await Theatre.findOne({_id: req.params.id});
        if(!theatre){
            return res.status(404).send({
                message: "Theatre being updated doesn't exist"
            });
        }
        const theatreObj = {
            name: req.body.name,
            description: req.body.description,
            city: req.body.city,
            pincode: req.body.pincode
        }
        const updatTheatre = await Theatre.updateOne( {_id: req.params.id}, theatreObj);
        res.status(200).send(updatTheatre);
    } catch (error) {
        console.log(err.message);
        res.status(500).send({
            message: "Failed in fetching Theatre!"
        });
    }
}

exports.deleteTheatre=async(req,res)=>{
    try {
        const theatre= await Theatre.deleteOne({_id:req.params.id})
        res.status(201).send({
            message: "Theatre deleted successfully!",
            deleted_theater : theatre
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            massage:'Failed in fetching Theatre!'
        })
    }
}

exports.addMovieToTheatre = async (req,res) => {
    const theatreId = req.params.id
    const movieIds = req.body.movieId
    const insert = req.body.insert
    if (!theatreId || !movieIds) {
        return res.status(400).send({
            message: 'bad request!'
        })
    }
    try {
        const theatre = await Theatre.findOne({
            _id: theatreId
        })
        if (insert==true) {
            movieIds.forEach(movie => {
                theatre.movie.push(movie)
            });
        }else {
            movieIds.forEach(movie => {
                theatre.movie =  theatre.movie.filter(id => id!=movie)
            });
        }
        await theatre.save()
        return res.status(200).send({
            Updated_Theatre: theatre
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}

exports.getTheatreByMovie =  async (req,res)=>{
    const movieId = req.params.movieId
    if(!movieId){
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try { 
          const theatre = await Theatre.find({movie:movieId})       
          if(!theatre){
            return res.status(404).send({
                message: "Theater does not exists!"
            })
         } 
          return res.status(200).send({
            Theatres : theatre
          })  
    }catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.MovieInsideTheTheatre = async (req,res)=>{
    const movieId = req.params.movieId
    const theatreId = req.params.theatreId
    if(!movieId || !theatreId){
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try {
         const theatre = await Theatre.findOne({_id:theatreId})
         if(!theatre){
            return res.status(404).send({
                message: "Theatre does not exists!"
            })
         }
         if(!theatre.movie.includes(movieId)){
            return res.status(404).send({
                message: "Movie not runing in theatre."
            })
         }
         return res.status(200).send({
            Movie_Runing_in_theatre : theatre
          })  
    }catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}

// const createFakeTheater = async (data) => {
//     for (let i = 0; i < data.length; i++) {
//         await Theatre.create(data[i])
//     }
//     console.log('created successfully!')
// }
// createFakeTheater(theatreSeed.theatreData)