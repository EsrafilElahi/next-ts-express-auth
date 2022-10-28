// const express = require("express");
const { Router } = require("express")
const { registerController, loginController, logoutController, refreshTokenController, forgotPasswordController, resetPasswordController } = require("../controllers/authController")
const { authenticate } = require("../middlewares/authenticated")
const router = Router();

// routes handle
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authenticate, logoutController);
router.post("/refresh-token", refreshTokenController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController)


module.exports = router;