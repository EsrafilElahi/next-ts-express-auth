const express = require("express");

const router = express.Router()

// routes handles
router.get("/", async (req, res) => {
  res.send("admin pannel")
})


module.exports = router;