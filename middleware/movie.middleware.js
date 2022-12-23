exports.validateMovie=(req,res,next)=>{
    if(!req.body.name){
        return res.sattus(400).send({
            massage:"failed! Movie name is not provided"
        })
    }
    if(!req.body.releaseStarus){
        return res.sattus(400).send({
            massage:"failed! Movie release starus is not provided"
        })
    }
    if(!req.body.releaseDate){
        return res.sattus(400).send({
            massage:"failed! Movie release date is not provided"
        })
    }
    if(!req.body.director){
        return res.sattus(400).send({
            massage:"failed! Movie director is not provided"
        })
    }
}