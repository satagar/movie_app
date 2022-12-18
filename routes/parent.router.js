const movieRoute = require('./movie.router');
const theaterRoute = require('./theater.router');
exports.createRoutes = (app) => {
    app.use('/movie', movieRoute);
    app.use('/theater', theaterRoute);
}

