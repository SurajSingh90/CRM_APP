const authJwt = require("../middleware/auth")
const userController = require("../controller/user.")

module.exports = function (app) {
    app.get('/crm/api/users/',
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.findAll)
    app.get('/crm/api/users/:userId',
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.findById
    )
    app.put('/crm/api/users/:userId',
        [authJwt.verifyToken, authJwt.isAdmin],
        userController.update
    )
}