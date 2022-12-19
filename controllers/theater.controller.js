const THEATER = require('../models/theater.model');
const fakeTheater = require('../seeders/theater.seed')

exports.createTheater = async (req, res) => {
    const body = req.body;
    const reqData = {
        name: body.name,
        description: body.description,
        city: body.city,
        pincode: body.pincode
    }
    try {
        const theater = await THEATER.create(reqData)
        return res.status(201).send({
            message: "Theater created successfully!",
            Created_Theater: theater
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.getTheaterById = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try {
        const theater = await THEATER.findOne({
            _id: id
        })
        if (!theater) {
            return res.status(404).send({
                message: "theater does not exists!"
            })
        }
        return res.status(200).send({
            Theater: theater
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.getTheaterByAllFileds = async (req, res) => {
    const query = req.query
    const queryData = {}
    if (query.name) {
        queryData.name = query.name
    }
    if (query.city) {
        queryData.city = query.city
    }
    if (query.pincode) {
        queryData.pincode = query.pincode
    }
    try {
        const theater = await THEATER.findOne(queryData)
        return res.status(200).send({
            Theater: theater
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.updateTheater = async (req, res) => {
    const body = req.body
    const id = req.params.id
    try {
        const theater = await THEATER.findOne({
            _id: id
        })
        if (!theater) {
            return res.status(404).send({
                message: "Theater  does not exists!",
            })
        }
        if (body.name) {
            theater.name = body.name
        }
        if (body.description) {
            theater.description = body.description
        }
        if (body.city) {
            theater.city = body.city
        }
        if (body.pincode) {
            theater.pincode = body.pincode
        }
        await theater.save()
        return res.status(200).send({
            message: "Theater updated successfully!",
            Updated_theater: theater
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.deleteTheater = async (req, res) => {
    const id = req.params.id
    if (!id) {
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try {
        const theater = await THEATER.findOneAndDelete({
            _id: id
        })
        if (!theater) {
            return res.status(404).send({
                message: "Theater does not exists for delete.",
            })
        }
        return res.status(200).send({
            message: "Theater deleted successfully!",
            deleted_theater: theater
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}

exports.addMovieToTheater = async (req,res) => {
    const theaterId = req.params.id
    const movieIds = req.body.movieId
    const insert = req.body.insert
    if (!theaterId || !movieIds) {
        return res.status(400).send({
            message: 'bad request!'
        })
    }
    try {
        const theater = await THEATER.findOne({
            _id: theaterId
        })
        if (insert==true) {
            movieIds.forEach(movie => {
                theater.movies.push(movie)
            });
        }else {
            movieIds.forEach(movie => {
                theater.movies =  theater.movies.filter(id => id!=movie)
            });
        }
        await theater.save()
        return res.status(200).send({
            Updated_Theater: theater
        })
    } catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.getTheaterByMovie =  async (req,res)=>{
    const movieId = req.params.movieId
    if(!movieId){
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try { 
          const theater = await THEATER.find({movies:movieId})        
          return res.status(200).send({
            Theaters : theater
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
//         await THEATER.create(data[i])
//     }
//     console.log('created successfully!')
// }
// createFakeTheater(fakeTheater.theater)