// const express = require("express");
const { Router } = require("express")
const { refreshTokenController, logoutController } = require("../controllers/refreshTokenController")
const { authenticate } = require("../middlewares/authenticated")
const router = Router();

// get new access token
router.post("/", refreshTokenController);

// delete token and logout
router.delete("/", logoutController)

module.exports = router;