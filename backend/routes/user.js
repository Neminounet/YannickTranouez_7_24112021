const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/user")

//  Middleware 
const multer = require("../middleware/multer")

router.post("/signup", multer, userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", multer, userCtrl.updateUser);
router.delete("/:id", userCtrl.deleteUser);
router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);

module.exports = router;