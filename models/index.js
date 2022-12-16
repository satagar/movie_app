'use strict';
const user = require("./user");
const movie = require("./movie");
const genre = require("./genre");
const crew = require("./crew");
const review = require("./review");

module.exports = {
    User: user,
    Movie: movie,
    Genre: genre,
    Crew: crew,
    Review: review
}