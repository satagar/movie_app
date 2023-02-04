const THEATER = require('../models/theater.model');
const fakeTheater = require('../seeders/theater.seed')
const USER = require('../models/user.model')
const sendEmail = require('../utils/notificationClient')
exports.createTheater = async (req, res) => {
    const body = req.body;
    const reqData = {
        name: body.name,
        description: body.description,
        city: body.city,
        pincode: body.pincode,
    }
    try {
        const theater = await THEATER.create(reqData)
        const user = await USER.findOne({userId:req.userId})
        sendEmail(theater._id,`Theater created successfully`, `Theater created successfully . the Theater ID : ${theater._id} and theater name is ${theater.name} . the theater created by ${user.name} .`,user.email,"movie-app@gmail.com")
        theater.ownerId = user._id
        await theater.save()
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
        const theater = await THEATER.find(queryData)
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
        const user = await USER.findOne({userId:req.userId})
        sendEmail(theater._id,`Theater Updated with the Theater ID : ${theater._id}`, `Theater updated successfully by the ${user.name} ! Updated theater summary : ${theater}`,user.email,"movie-app@gmail.com")
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
        /*
             send Notification when user delete the theater
        */
        const user = await USER.findOne({userId:req.userId})
        sendEmail(theater._id,`Theater deleted with the Theater ID : ${theater._id}`, `Theater Deleted successfully by the ${user.name}`,user.email,"movie-app@gmail.com")
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
        let data = '';
        if (insert==true) {
            movieIds.forEach(movie => {
                theater.movies.push(movie)
            });
            data =`Movie add in the theater ID is ${theater._id} and name : ${theater.name} . Movie add into the theater successfully . Thanks for adding movie into the theater.`
        }else {
            movieIds.forEach(movie => {
                theater.movies =  theater.movies.filter(id => id!=movie)
            });
            data = `Movie Delete From the theater ID is ${theater._id} and name : ${theater.name} . Movie Delete from the theater successfully . Thanks You `
        }
        await theater.save()
        const user = await USER.findOne({userId:req.userId})
        sendEmail(theater._id,`Update Information the theater ID is ${theater._id} and name : ${theater.name}`,data,user.email,"movie-app@gmail.com")
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
          if(!theater){
            return res.status(404).send({
                message: "Theater does not exists!"
            })
         } 
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
exports.MovieInsideTheTheater = async (req,res)=>{
    const movieId = req.params.movieId
    const theaterId = req.params.theaterId
    if(!movieId || !theaterId){
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try {
         const theater = await THEATER.findOne({_id:theaterId})
         if(!theater){
            return res.status(404).send({
                message: "Theater does not exists!"
            })
         }
         if(!theater.movies.includes(movieId)){
            return res.status(404).send({
                message: "Movie not runing in theater."
            })
         }
         return res.status(200).send({
            Movie_Runing_in_theater : theater
          })  
    }catch (err) {
        console.log(err.message)
        return res.status(500).send({
            message: "Internal server error!"
        })
    }
}
exports.deleteTheaterByName = async (req, res) => {
    const name = req.params.name
    if (!name) {
        return res.status(400).send({
            message: "bad request!"
        })
    }
    try {
        const theater = await THEATER.findOneAndDelete({
            name: name
        })
        if (!theater) {
            return res.status(404).send({
                message: `${name} Theater does not exists .`,
            })
        }
        const user = await USER.findOne({userId:req.userId})
        sendEmail(theater._id,`Theater deleted with the Theater ID : ${theater._id}`, `Theater Deleted successfully by the ${user.name}`,user.email,"movie-app@gmail.com")
        return res.status(200).send({
            message: `${name} Theater deleted successfully!`,
            deleted_theater: theater
        })
    } catch (err) {
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