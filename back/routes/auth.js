const express = require("express");
const { registerController, loginController, logoutController, refreshTokenController } = require("../controllers/authController")
const { authenticate } = require("../middlewares/authenticated")
const router = express.Router()

// routes handle
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);
router.post("/refresh-token", refreshTokenController)



module.exports = router;