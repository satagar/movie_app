const userController = require('../controllers/user.controller')

module.exports = function (app) {
    app.post('/mba/api/v1/user', userController.signUp)
    app.post('/mba/api/v1/user', userController.signIn)
}