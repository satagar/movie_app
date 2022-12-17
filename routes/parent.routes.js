const movieRouter = require('./movie.routes');
const threatreRouter = require('./threate.routes');

module.exports = (app) => {
    app.use("/mba/api/v1/movies", movieRouter);
    app.use("/mba/api/v1/threatres", threatreRouter);
}