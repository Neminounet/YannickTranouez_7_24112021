const express = require("express");
const router = express.Router();
const messageCtrl = require("../controller/message");

//  Les Middlewares 
// ============================================================================

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// Les Routes 
// ============================================================================

router.post("/new", auth, multer, messageCtrl.createMessage);
router.put("/:id", auth, multer, messageCtrl.updateMessage);
router.delete("/:id", auth, messageCtrl.deleteMessage);

// Exportation
// ============================================================================

module.exports = router;