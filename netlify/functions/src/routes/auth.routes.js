const authController = require('../controllers/auth.controller')
const { isUserIdRegisteredOrProvided, isEmailRegisteredOrProvided, isPasswordProvided, isUserIdProvided } = require('../middlewares/validateUser')

module.exports = function (app) {
    /* ------ USER SIGNUP -------- */
    app.post('/api/auth/signup', [isUserIdRegisteredOrProvided, isEmailRegisteredOrProvided, isPasswordProvided], authController.signup)
    /* ------ USER SIGNIN -------- */
    app.post('/api/auth/signin', [isUserIdProvided, isPasswordProvided], authController.signin)
}