const ticketController = require("../controller/ticket.controller")
const authJwt = require("../middleware/auth")

module.exports = function (app) {
    app.post("/crm/api/tickets", [authJwt.verifyToken],ticketController.createTicket)
   
    app.put("/crm/api/ticketsupdate/:id",ticketController.ticketUpdate)
} 