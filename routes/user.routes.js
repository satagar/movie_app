const userController = require('../controllers/user.controller')
const authJwt = requires('../middlewares/user.validator')

module.exports = function (app) {
    app.post('/mba/api/v1/user', userController.signUp)
    app.post('/mba/api/v1/user', userController.signIn)
    app.put('/mba/api.v1/user', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUser)
}