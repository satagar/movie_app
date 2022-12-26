const userController = require('../controllers/user.controller')
const authJwt = require('../middlewares/user.validator')

module.exports = function (app) {
    app.post('/mba/api/v1/user', userController.signUp)
    app.post('/mba/api/v1/user', userController.signIn)
    app.get('/mba/api/v1/users', [authJwt.isAdmin], userController.getAllUsers)
    app.put('/mba/api.v1/user', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)
    app.put('/mba/api/v1/user', [authJwt.verifyToken], userController.updateUserPassword)
}