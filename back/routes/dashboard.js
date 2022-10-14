const express = require("express");

const router = express.Router()

// routes handles
router.get("/", async (req, res) => {
  res.send("dashboard page")
})


module.exports = router;