const { Router } = require("express");
const { refreshTokenController, refreshTokenLogoutController } = require("../controllers/refreshTokenController");
const router = Router();

router.post("/", refreshTokenController);
router.delete("/", refreshTokenLogoutController);


module.exports = router;