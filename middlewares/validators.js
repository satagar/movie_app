const { check, validationResult } = require('express-validator');
const { User, Movie } = require("../models");

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
    movieCreate: [
        check('title').trim().escape().not().isEmpty().withMessage('Title cannot be empty').bail().isLength({ min: 1 }).withMessage('Name must be minimum 1 characters').bail(),
        check('about').trim().escape().not().isEmpty().withMessage('About cannot be empty').bail().isLength({ min: 50 }).withMessage('About must be minimum 100 characters').bail(),
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
        check('title').trim().escape().not().isEmpty().withMessage('Title cannot be empty').bail().isLength({ min: 1 }).withMessage('Name must be minimum 1 characters').bail(),
        check('about').trim().escape().not().isEmpty().withMessage('About cannot be empty').bail().isLength({ min: 50 }).withMessage('About must be minimum 100 characters').bail(),
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
    ]
}