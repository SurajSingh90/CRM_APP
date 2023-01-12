const authcontroller = require('../controller/auth')
// const {verifyToken} =  require("../middleware/auth")
module.exports = function(app){
    // app.use('/auth', authcontroller)
    app.post('/auth/login', authcontroller.login)
    // app.use('/auth/logout', authcontroller.logout) 
    app.post('/auth/signup', authcontroller.signup)
}