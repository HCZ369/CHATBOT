const expres = require("express");
const router = expres.Router();
const whatsAppControllers = require("../controllers/whatsappControllers");

router
.get("/", whatsAppControllers.verifyToken)
.post("/", whatsAppControllers.receivedMessage);

module.exports = router;