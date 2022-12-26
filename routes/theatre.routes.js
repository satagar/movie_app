const theatreController = require("../controllers/theatre.controller")
const authJwt = require('../middlewares/user.validator')

module.exports = function (app) {
    app.post("/mba/api/v1/theatres", theatreController.createTheatre)
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres)
    app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre)
    app.put("/mba/api/v1/theatres/:id", [authJwt.isAdmin], theatreController.updateTheatre)
    app.delete("/mba/api/v1/theatres/:id", [authJwt.isAdmin], theatreController.deleteTheatre)
    app.put("/mba/api/v1/theatres/:id/movies", [authJwt.isAdmin], theatreController.addMoviesToATheater)
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId", theatreController.checkMovieInsideATheatre)
}
