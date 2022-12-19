const movieRouter = require('./movie.routes');
const theatreRouter = require('./theatre.routes');

module.exports = (app) => {
    app.use("/mba/api/v1/movies", movieRouter);
    app.use("/mba/api/v1/theatres", theatreRouter);
}