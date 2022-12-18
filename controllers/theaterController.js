const Theater = require('../models/theater.model');

exports.createTheater = async (req, res) => {
    const body = req.body;

    const theaterObj = {
        name : body.name,
        description : body.description,
        city : body.city,
        pincode : body.pincode
    }

    try {
        console.log(`theater added successfully!`)
        const theater = await Theater.create(theaterObj);
        res.status(201).send(theater);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}

exports.getAllTheaters = async (req, res) => {
    
    const criteria = {};
    if(req.query.name) {
        criteria.name = req.query.name
    }
    if(req.query.city) {
        criteria.city = req.query.city
    }
    if(req.query.pincode) {
        criteria.pincode = req.query.pincode
    }
    try {
        const theater = await Theater.find(criteria);
        res.status(200).send(theater)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}

exports.deleteTheater = async (req, res) => {
    const delReq = req.params.id
    try {
        console.log(`Theater deleted successfully!`)
        const theater = await Theater.deleteOne({_id : delReq});
        res.status(200).send({
            message : `Theater has been deleted successfully!`
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error in processing your request. Please try again after sometome!`
        })
    }
}


exports.updateTheater = async (req, res) => {
    const reqId = req.params.id;
    const body = req.body;
    try {
        const theaterInDb = await Theater.findOne({ _id : reqId})
        if(!theaterInDb) {
            res.status(400).send({
                message : `Something wrong with the update data!`
            })
        }

        theaterInDb.name = body.name != undefined ? body.name : theaterInDb.name
        theaterInDb.description = body.description != undefined ? body.description : theaterInDb.description
        theaterInDb.city = body.casts != undefined ? body.city : theaterInDb.city
        theaterInDb.pincode = body.pincode != undefined ? body.pincode : theaterInDb.pincode

        const updatedTheater = await theaterInDb.save();
        res.status(200).send(updatedTheater);  
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured in processing your request. Please try again after sometime!`

        });
    }
}