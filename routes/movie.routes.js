const movie = require('../controllers/movie.controller')
const DB = require('../configs/db.config')

movie.post('/',)
movie.get('/', movie.getAllMovies)
movie.get('/', movie.getMovieById)
movie.get('/', movie.getMovieByName)
movie.put('/',)
movie.delete('/', movie.deleteMovie) 
