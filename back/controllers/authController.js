const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const { validateRegister, validateLogin } = require("../helpers/validation");
const generateTokens = require("../helpers/generateTokens");


const registerController = async (req, res) => {
  // check validator
  const error = validateRegister(req.body);
  if (error) {
    return res.status(400).send("validation error!");
  }

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
};

const loginController = async (req, res) => {
  // check validator
  const error = validateLogin(req.body);
  if (error) {
    return res.status(400).send("validation error!");
  }
  // check user exist
  const userExist = await Users.findOne({ email: req.body.email }).exec();
  !userExist && res.status(404).send("user not found!");

  // check password
  const validPassword = await bcrypt.compare(req.body.password, userExist.password);
  !validPassword && res.status(400).send("userName or password is invalid!");

  try {
    // create tokens
    const { accessToken, refreshToken } = await generateTokens(userExist);

    // set in header
    res.setHeader("Authorization", `Bearer ${refreshToken}`);

    // set in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: process.env.NODE_ENV === "production",
    });
    
    res.status(200).json({ message: "login successfully!", accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "error login!", error: err });
  }
};

const forgotPasswordController = async (req, res) => {
  // check exist user
  const user = await Users.findOne({ email: req.body.email });
  !user && res.status(404).send("user not found!");

  try {
    // create token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "10m" });

    const link = `http://localhost:${process.env.PROJECT_PORT}/users/forgot-password/${token}`

    res.status(201).json({
      resetPasswordLink: link,
      msg: "rest password link is sent successfully",
    });

  } catch (err) {
    res.status(500).json({ msg: "err in forgot password", error: err })
  }
}

const resetPasswordController = async (req, res) => {
  const token = req.params.token;
  !token && res.status(401).send("no token found!")

  // verify token and check it
  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
  if (!verifiedToken) {
    res.status(401).send("un authorized!");
  }

  // check password with passwordConfirm
  if (req.body.password !== req.body.passwordConfirm) {
    res.status(422).send("two passwords are not same!");
  }

  try {
    const user = await Users.findById(verifiedToken.id);
    !user && res.status(404).send("the user not found!");

    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).send("password has been changed");
  } catch (err) {
    res.status(400).json({ msg: "reset password is failed", error: err });
  }



}

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordController
};
