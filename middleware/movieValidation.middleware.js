const {movieReleaseStatus} = require('../helpers/movie.constant')
exports.movieValidate = (req,res,next)=>{
    const body = req.body;
    if(!body.name){
        return res.status(400).send({
            message:"Movie Name not found! Name is required!"
        })
    }
    if(!body.releaseDate){
        return res.status(400).send({
            message:"Movie Release date  not found! Release Date is required!"
        })
    }
    if(!body.director){
        return res.status(400).send({
            message:"Movie director  not found! director is required!"
        })
    }
    if(!body.movieImage){
        return res.status(400).send({
            message:"Movie Image  not found! Movie Image required!"
        })
    }
    if(!body.price){
        return res.status(400).send({
            message:"Movie Price  not found! Price is required!"
        })
    }
    if(!movieReleaseStatus[body.releaseStatus.toUpperCase()]){
        return res.status(400).send({
            message:"Movie Release Status  not found! Release Status Price!"
        })
    }
    next()
}