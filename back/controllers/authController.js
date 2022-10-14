const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { validateRegister, validateLogin } = require("../helpers/validation")



const registerController = async (req, res) => {
  // check validator
  const { error } = validateRegister(req.body)
  error && res.status(400).send('validation error!')

  // check user exist
  const userExist = await Users.findOne({ email: req.body.email })
  userExist && res.status(409).send("user already exist!")

  // create user
  try {
    // hashed pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new Users({ ...req.body, password: hashedPassword });
    await newUser.save();

    // create jwt token

  } catch (err) {

  }
}

const loginController = async (req, res) => {
  // handle register
}


module.exports = {
  registerController,
  loginController
}