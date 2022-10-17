const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { validateRegister, validateLogin } = require("../helpers/validation");
const generateTokens = require("../helpers/generateTokens");


const registerController = async (req, res) => {
  // check validator
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).send('validation error!');
  }

  console.log("Users :", Users)

  // check user exist
  const userExist = await Users.findOne({ email: req.body.email });
  userExist && res.status(409).send("user already exist!");

  res.send("userExist no error")

  try {
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.gozar, salt);
    const savedUser = new Users({ ...req.body, gozar: hashedPassword });
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
  const validPassword = await bcrypt.compare(req.body.gozar, userExist.gozar);
  !validPassword && res.status(400).send("userName or password is invalid!");


  // // set in header
  // res.header("X-Auth", accessToken)

  // // set in cookie
  // res.cookie('jwt', refreshToken, {
  //   httpOnly: true,
  //   sameSite: "none",
  //   secure: true,
  //   maxAge: 24 * 60 * 60 * 1000
  // });

  try {
    const { accessToken, refreshToken } = await generateTokens(userExist)
    res.status(200).json({ message: "login successfully!", accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: 'error login!', error: err });
  }

}

// const logoutController = async (req, res) => {
//   return res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true }).status(200).send("Successfully logged out");
// }



const refreshTokenController = async (req, res) => {
  const refresh_token = req.cookies.jwt
  !refresh_token && res.status(406).send("not Authorized!")

  try {
    const verifiedToken = jwt.verify(refresh_token, process.env.JWT_SECRET_KEY)
    !verifiedToken && res.status(406).send("not Authorized!")
    const accessToken = jwt.sign({ id: user?.Id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });

    return res.status(201).json({ accessToken: accessToken })
  } catch (error) {
    res.status(406).send("refresh token is invalid")
  }
}


module.exports = {
  registerController,
  loginController,
  logoutController,
  refreshTokenController
}