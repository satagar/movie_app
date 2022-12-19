const { check, validationResult } = require('express-validator');
const { User, Movie, Theater } = require("../models");

const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
    next();
}

module.exports = {
    authRegister: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return User.findOne({ email: value }).then(user => { if(user) return Promise.reject('Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        handleValidation
    ],
    authLogin: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail(),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail(),
        handleValidation
    ],
    authRefresh: [
        check('accessToken').trim().escape().not().isEmpty().withMessage('Access token cannot be empty').bail(),
        check('refreshToken').trim().escape().not().isEmpty().withMessage('Refresh token cannot be empty').bail(),
        handleValidation
    ],
    userCreate: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return User.findOne({ email: value }).then(user => { if(user) return Promise.reject('Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('role').trim().escape().not().isEmpty().withMessage('Role cannot be empty').bail().custom(value => {
            if(!User.roles.includes(value)) throw new Error(`Role is invalid. Please provide any of: ${User.roles.join()}`);
        }),
        handleValidation
    ],
    userUpdate: [
        check('email').trim().escape().not().isEmpty().withMessage('Email cannot be empty').bail().isEmail().withMessage('Email is invalid').bail().custom(value => {
            return User.findOne({ email: value, _id: { $ne: req.params.id } }).then(user => { if(user) return Promise.reject('Email is already taken')} );
        }),
        check('password').trim().escape().not().isEmpty().withMessage('Password cannot be empty').bail().isLength({ min: 5 }).withMessage('Password must be minimum 5 characters').bail(),
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('role').trim().escape().not().isEmpty().withMessage('Role cannot be empty').bail().custom(value => {
            if(!User.roles.includes(value)) throw new Error(`Role is invalid. Please provide any of: ${User.roles.join()}`);
        }),
        handleValidation
    ],
    movieCreate: [
        check('title').trim().escape().not().isEmpty().withMessage('Title cannot be empty').bail().isLength({ min: 1 }).withMessage('Title must be minimum 1 characters').bail(),
        check('about').trim().escape().not().isEmpty().withMessage('About cannot be empty').bail().isLength({ min: 50 }).withMessage('About must be minimum 50 characters').bail(),
        check('posterUrl').isURL().withMessage('Poster URL must be an URL').bail(),
        check('trailerUrl').isURL().withMessage('Poster URL must be an URL').bail(),
        check('runtime').trim().escape().not().isEmpty().withMessage('Runtime cannot be empty').bail().isInt().withMessage('Runtime must be an Integer').bail(),
        check('cbfcCertification').trim().escape().not().isEmpty().withMessage('CBFC Certification cannot be empty').bail().custom(value => {
            if(!Movie.cbfcCertifications.includes(value)) throw new Error(`CBFC Certification is invalid. Please provide any of: ${Movie.cbfcCertifications.join()}`);
        }),        
        check('releaseDate').trim().escape().not().isEmpty().withMessage('Release Date cannot be empty').bail().isDate().withMessage('Release Date must be a Date').bail(),
        check('status').trim().escape().not().isEmpty().withMessage('Status cannot be empty').bail().custom(value => {
            if(!Movie.statuses.includes(value)) throw new Error(`Status is invalid. Please provide any of: ${Movie.statuses.join()}`);
        }),
        check('genres').trim().escape().not().isEmpty().withMessage('Genres cannot be empty').bail().isArray().withMessage('Genres must be an array').bail(),
        check('directors').trim().escape().not().isEmpty().withMessage('Directors cannot be empty').bail().isArray().withMessage('Directors must be an array').bail(),
        check('writers').trim().escape().not().isEmpty().withMessage('Writers cannot be empty').bail().isArray().withMessage('Writers must be an array').bail(),
        check('cast').trim().escape().not().isEmpty().withMessage('Casst cannot be empty').bail().isArray().withMessage('Cast must be an array').bail(),
        handleValidation
    ],
    movieUpdate: [
        check('title').trim().escape().not().isEmpty().withMessage('Title cannot be empty').bail().isLength({ min: 1 }).withMessage('Title must be minimum 1 characters').bail(),
        check('about').trim().escape().not().isEmpty().withMessage('About cannot be empty').bail().isLength({ min: 50 }).withMessage('About must be minimum 50 characters').bail(),
        check('posterUrl').isURL().withMessage('Poster URL must be an URL').bail(),
        check('trailerUrl').isURL().withMessage('Poster URL must be an URL').bail(),
        check('runtime').trim().escape().not().isEmpty().withMessage('Runtime cannot be empty').bail().isInt().withMessage('Runtime must be an Integer').bail(),
        check('cbfcCertification').trim().escape().not().isEmpty().withMessage('CBFC Certification cannot be empty').bail().custom(value => {
            if(!Movie.cbfcCertifications.includes(value)) throw new Error(`CBFC Certification is invalid. Please provide any of: ${Movie.cbfcCertifications.join()}`);
        }),        
        check('releaseDate').trim().escape().not().isEmpty().withMessage('Release Date cannot be empty').bail().isDate().withMessage('Release Date must be a Date').bail(),
        check('status').trim().escape().not().isEmpty().withMessage('Status cannot be empty').bail().custom(value => {
            if(!Movie.statuses.includes(value)) throw new Error(`Status is invalid. Please provide any of: ${Movie.statuses.join()}`);
        }),
        check('genres').trim().escape().not().isEmpty().withMessage('Genres cannot be empty').bail().isArray().withMessage('Genres must be an array').bail(),
        check('directors').trim().escape().not().isEmpty().withMessage('Directors cannot be empty').bail().isArray().withMessage('Directors must be an array').bail(),
        check('writers').trim().escape().not().isEmpty().withMessage('Writers cannot be empty').bail().isArray().withMessage('Writers must be an array').bail(),
        check('cast').trim().escape().not().isEmpty().withMessage('Casst cannot be empty').bail().isArray().withMessage('Cast must be an array').bail(),
        handleValidation
    ],
    theaterCreate: [
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('description').trim().escape().not().isEmpty().withMessage('Description cannot be empty').bail().isLength({ min: 50 }).withMessage('Description must be minimum 50 characters').bail(),
        check('city').trim().escape().not().isEmpty().withMessage('City cannot be empty').bail().isLength({ min: 1 }).withMessage('City must be minimum 1 characters').bail(),
        check('address').trim().escape().not().isEmpty().withMessage('Address cannot be empty').bail(),
        check('coordinates').trim().escape().not().isEmpty().withMessage('Coordinates cannot be empty').bail().isArray().withMessage('Coordinates must be an array').bail().custom(value => {
            if(item.length < 2) throw new Error(`Coordinates must contain two values`);
            for(item of value) if(isNaN(item)) throw new Error(`Coordinates must contain only numbers`);
        }),
        check('facilities').trim().escape().not().isEmpty().withMessage('Facilities cannot be empty').bail().isArray().withMessage('Genres must be an array').bail().custom(value => {
            for(item of value) if(!Theater.facilites.includes(item)) throw new Error(`One of the facilities is invalid. Please provide any of: ${Theater.facilites.join()}`);
        }),
        check('refundsEnabled').trim().escape().not().isEmpty().withMessage('Refunds Enabled cannot be empty').bail().isBoolean().withMessage('Refunds Enabled must be a boolean').bail(),
        handleValidation
    ],
    theaterUpdate: [
        check('name').trim().escape().not().isEmpty().withMessage('Name cannot be empty').bail().isLength({ min: 3 }).withMessage('Name must be minimum 3 characters').bail(),
        check('description').trim().escape().not().isEmpty().withMessage('Description cannot be empty').bail().isLength({ min: 50 }).withMessage('Description must be minimum 50 characters').bail(),
        check('city').trim().escape().not().isEmpty().withMessage('City cannot be empty').bail().isLength({ min: 1 }).withMessage('City must be minimum 1 characters').bail(),
        check('address').trim().escape().not().isEmpty().withMessage('Address cannot be empty').bail(),
        check('coordinates').trim().escape().not().isEmpty().withMessage('Coordinates cannot be empty').bail().isArray().withMessage('Coordinates must be an array').bail().custom(value => {
            if(item.length < 2) throw new Error(`Coordinates must contain two values`);
            for(item of value) if(isNaN(item)) throw new Error(`Coordinates must contain only numbers`);
        }),
        check('facilities').trim().escape().not().isEmpty().withMessage('Facilities cannot be empty').bail().isArray().withMessage('Genres must be an array').bail().custom(value => {
            for(item of value) if(!Theater.facilites.includes(item)) throw new Error(`One of the facilities is invalid. Please provide any of: ${Theater.facilites.join()}`);
        }),
        check('refundsEnabled').trim().escape().not().isEmpty().withMessage('Refunds Enabled cannot be empty').bail().isBoolean().withMessage('Refunds Enabled must be a boolean').bail(),
        handleValidation
    ],
    theaterSetMovies: [
        check('movieIds').trim().escape().not().isEmpty().withMessage('Movie IDs cannot be empty').bail().isArray().withMessage('Movie IDs must be an array').bail(),
        check('insert').trim().escape().not().isEmpty().withMessage('Insert cannot be empty').bail().isBoolean().withMessage('Movie IDs must be a boolean').bail(),
        handleValidation
    ]
}