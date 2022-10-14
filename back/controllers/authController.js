const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { validateRegister, validateLogin } = require("../helpers/validation");
const generateTokens = require("../helpers/generateTokens");


const registerController = async (req, res) => {
  // check validator
  const { error } = validateRegister(req.body);
  error && res.status(400).send('validation error!');

  // check user exist
  const userExist = await Users.findOne({ email: req.body.email });
  userExist && res.status(409).send("user already exist!");

  try {
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const savedUser = new Users({ ...req.body, password: hashedPassword });
    await savedUser.save();
    res.status(201).json({ message: "user created successfully!", user: savedUser });
  } catch (err) {
    res.status(500).send("an error accured in creating user");
  }
}

const loginController = async (req, res) => {
  // check validator
  const { error } = validateLogin(req.body);
  error && res.status(400).send('validation error!');

  // check user exist
  const userExist = await Users.findOne({ email: req.body.email });
  !userExist && res.status(409).send("user doesn't exist!");

  // check password
  const validPassword = await bcrypt.compare(req.body.password, userExist.password);
  !validPassword && res.status(400).send("userName or password is invalid!");

  const { accessToken, refreshToken } = await generateTokens(userExist)

  // set in header
  res.header("accessToken", accessToken)

  // set in cookie
  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000
  });
  return res.json({ accessToken });

  try {

  } catch (err) {

  }

}

const refreshTokenController = async (req, res) => {
  const refresh_token = req.cookie.jwt
  !refresh_token && res.status(406).send("not Authorized!")

  try {
    const verifiedToken = jwt.verify(refresh_token, process.env.JWT_SECRET_KEY)
    !verifiedToken && res.status(406).send("not Authorized!")
    const accessToken = jwt.sign({ userId: user?.Id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });

    return res.status(201).json({ accessToken: accessToken })
  } catch (error) {
    res.status(406).send("refresh token is invalid")
  }
}


module.exports = {
  registerController,
  loginController,
  refreshTokenController
}