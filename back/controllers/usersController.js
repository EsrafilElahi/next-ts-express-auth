const Users = require("../models/users")

const getUsersController = async (req, res) => {
  try {
    const { page, limit } = req.query;

    console.log('req.query :', req.query);

    const users = await Users.find({ ...req.query }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
      // We multiply the "limit" variables by one just to make sure we pass a number and not a string
      .limit(limit * 1)
      // I don't think i need to explain the math here
      .skip((page - 1) * limit)
      // We sort the data by the date of their creation in descending order (user 1 instead of -1 to get ascending order)
      .sort({ createdAt: -1 })
      // execute code
      .exec()

    const usersCount = await Users.countDocuments();

    !users && res.status(404).send("no users found!");

    res.status(200).json({ msg: "all users", count: usersCount, totalPages: Math.ceil(usersCount / limit), users: users });
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