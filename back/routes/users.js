const { Router } = require("express");
const { getUsersController, getUserController, deleteUserController, updateUserController } = require("../controllers/usersController")


const router = Router();

// routes handle
router.get("/", getUsersController)
router.get("/:userId", getUserController)
router.delete("/:userId", deleteUserController)
router.put("/:userId", updateUserController)



module.exports = router;

