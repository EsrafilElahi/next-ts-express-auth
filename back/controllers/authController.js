const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { validateRegister, validateLogin } = require("../helpers/validation");
const generateTokens = require("../helpers/generateTokens");

const registerController = async (req, res) => {
  // check validator
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).send("validation error!");
  }

  console.log("Users :", Users);

  // check user exist
  const userExist = await Users.findOne({ email: req.body.email });
  userExist && res.status(409).send("user already exist!");

  res.send("userExist no error");

  try {
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const savedUser = new Users({ ...req.body, password: hashedPassword });
    await savedUser.save();
    res
      .status(201)
      .json({ message: "user created successfully!", user: savedUser });
  } catch (err) {
    res.status(500).send("an error accured in creating user");
  }
};

const loginController = async (req, res) => {
  // check validator
  const { error } = validateLogin(req.body);
  error && res.status(400).send("validation error!");

  // check user exist
  const userExist = await Users.findOne({ email: req.body.email });
  !userExist && res.status(409).send("user doesn't exist!");

  // check password
  const validPassword = await bcrypt.compare(
    req.body.password,
    userExist.password
  );
  !validPassword && res.status(400).send("userName or password is invalid!");

  // // set in header
  // res.header("X-Auth", accessToken)

  try {
    // create tokens
    const { accessToken, refreshToken } = await generateTokens(userExist);
    // // set in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res
      .status(200)
      .json({ message: "login successfully!", accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "error login!", error: err });
  }
};

const logoutController = async (req, res) => {
  const cookies = req.cookies;
  !cookies?.jwt && res.status(201).send("No Content!");
  const refreshToken = cookies.jwt;

  // refresh token in db
  const 

};

const refreshTokenController = async (req, res) => {
  const cookies = req.cookies;
  !cookies?.jwt && res.status(401).send("Not Authorized!");
  const refreshToken = cookies.jwt;

  const foundUser = await Users.findOne({ refreshToken: refreshToken });
  !foundUser && res.status(403).send("Forbidden!");

  try {
    const verifiedToken = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    !verifiedToken && res.status(403).send("Forbidden!");
    const accessToken = jwt.sign(
      { id: foundUser?.Id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );

    return res.status(201).json({ accessToken: accessToken });
  } catch (error) {
    res.status(406).send("refresh token is invalid");
  }
};

module.exports = {
  registerController,
  loginController,
  logoutController,
  refreshTokenController,
};
