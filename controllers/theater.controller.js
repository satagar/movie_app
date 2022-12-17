const THEATER = require('../models/theater.model');
const fakeTheater = require('../seeders/theater.seed')

exports.createTheater = async (req,res)=>{
    const body = req.body;
    const reqData = {
        name:body.name,
        description:body.description,
        city:body.city,
        pincode:body.pincode
    }
    try {
           const theater = await THEATER.create(reqData)
           return res.status(201).send({
            message:"Theater created successfully!"
           })
    }catch(err){
        console.log(err.message)
        return res.status(500).send({
            message:"Internal server error!"
        })
    }
}
exports.getTheaterById = async (req,res)=>{
         const id = req.params.id
         if(!id){
            return  res.status(400).send({
                message:"Id not found!"
            })
         }
         try{
            const theater = await THEATER.findOne({_id:id})
            if(!theater){
               return  res.status(400).send({
                    message:"theater does not exists!"
                })
            }
            return  res.status(201).send({
                Theater:theater
            })
         }catch(err){
            console.log(err.message)
            return  res.status(500).send({
                message:"Internal server error!"
            })
         }
}
exports.getTheaterByAllFileds = async (req,res)=>{
    const query = req.query
    const queryData = {}
    if(name){
         queryData.name = query.name
    }
    if(city){
        queryData.city = query,city
    }
    if(pincode){
        queryData.pincode = query.pincode
    }
    try{
       const theater = await THEATER.findOne(queryData)
       return  res.status(201).send({
           Theater:theater
       })
    }catch(err){
       console.log(err.message)
       return  res.status(500).send({
           message:"Internal server error!"
       })
    }
}

const createFakeTheater = async (data) => {
    for (let i = 0; i < data.length; i++) {
        await THEATER.create(data[i])
    }
    console.log('created successfully!')
}
createFakeTheater(fakeTheater.theater)