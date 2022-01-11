const express = require("express");
const router = express.Router();
const commentCtrl = require("../controller/comment");

//  Les Middlewares 
// ============================================================================

const auth = require("../middleware/auth");

// Les Routes
// ============================================================================

router.post("/:idMessage", auth, commentCtrl.createComment);
router.delete("/:idComment", auth, commentCtrl.deleteComment);
router.get("/:idMessage", auth, commentCtrl.getAllComments);


// Exportation
// ============================================================================

module.exports = router;