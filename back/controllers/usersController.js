const Users = require("../models/users")

const getUsersController = async (req, res) => {
  try {
    const users = await Users.find();
    !users && res.status(404).send("no users found!");
    res.status(200).json({ msg: "all users", count: users.length, users: users })
  } catch (err) {
    res.status(500).json({ msg: "error in get users", error: err })
  }
};

const getUserController = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findById(userId).exec()
    res.status(200).json({ msg: "get user successfully!", user: user })
  } catch (error) {
    res.status(500).send("failed get user!")
  }

};

const deleteUserController = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findByIdAndDelete(userId).exec()
    res.status(200).json({ msg: "user has been deleted!", deletedUser: user })
  } catch (error) {
    res.status(500).send("failed delete user!")
  }
};

const updateUserController = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await Users.updateMany({ _id: userId }, { $set: req.body }).exec()
    res.status(200).json({ msg: "all changes changed!", user: user })
  } catch (error) {
    res.status(500).send("failed update info!")
  }
};

module.exports = {
  getUsersController,
  getUserController,
  deleteUserController,
  updateUserController
}