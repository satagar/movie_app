const movieRoute = require('./movie.router')

exports.createRoutes = (app) => {
    app.use('/movie', movieRoute);
}

