// const express = require("express");
const { Router } = require("express")
const { refreshTokenController, logoutController } = require("../controllers/refreshTokenController")
const { authenticate } = require("../middlewares/authenticated")
const router = Router();

// get new access token
router.post("/", refreshTokenController);

module.exports = router;