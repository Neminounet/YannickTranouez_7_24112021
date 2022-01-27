const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user");
// const limit = require("../middleware/limit");

//  Les Middlewares 
// ============================================================================

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");

// Les Routes 
// ============================================================================

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, multer, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);

// Exportation
// ============================================================================

module.exports = router;