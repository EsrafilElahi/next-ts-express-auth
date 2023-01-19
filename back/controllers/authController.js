const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/users");
const UserRefreshTokens = require("../models/refreshToken")
const { validateRegister, validateLogin } = require("../helpers/validation");
const generateTokens = require("../helpers/generateTokens");


const registerController = async (req, res) => {
  const { data } = req.body;

  // check validator
  const { error } = validateRegister(data);
  if (error) {
    return res.status(400).json({ message: "validation error!", error: error });
  }

  // check user exist
  const userExist = await Users.findOne({ email: data.email }).exec();
  userExist && res.status(409).send("user already exist!");

  try {
    // hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    const savedUser = new Users({ ...data, password: hashedPassword });
    await savedUser.save();
    const { password, passwordConfirm, ...restUserData } = data;
    res.status(201).json({ message: "user created successfully!", user: restUserData });
  } catch (err) {
    res.status(500).json({ message: "an error accured in creating user", error: err });
  }
};

const loginController = async (req, res) => {
  const { data } = req.body;

  // check validator
  const error = validateLogin(data);
  if (error) {
    return res.status(400).send("validation error!");
  }
  // check user exist
  const userExist = await Users.findOne({ email: data.email }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, _id: 0 }).exec();
  !userExist && res.status(404).send("user not found!");

  // check password
  const validPassword = await bcrypt.compare(data.password, userExist.password);
  !validPassword && res.status(400).send("userName or password is not valid!");

  try {
    // create tokens
    const { accessToken, refreshToken } = await generateTokens(userExist);

    // const sendUser = {
    //   firstName: userExist.firstName,
    //   lastName: userExist.lastName,
    //   email: userExist.email,
    //   job: userExist.job,
    //   birthDate: userExist.birthDate,
    //   age: userExist.age,
    //   gender: userExist.gender,
    //   isAdmin: userExist.isAdmin,
    // };

    console.log('userExist :', userExist);

    res.status(200).json({ message: "login successfully!", user: userExist, accessToken, refreshToken });
  } catch (err) {
    res.status(401).json({ message: "error login unauthorized!", error: err });
  }
};

const logoutController = async (req, res) => {
  try {

    // check refresh token in db and delete the token
    const refreshToken = await UserRefreshTokens.findOne({ token: req.body.refreshToken });
    !refreshToken && res.status(200).send("token not found - logged out successfully!");

    // remove the token
    await refreshToken.remove()
    res.status(200).send("token found and deleted - logged out successfully!");

  } catch (err) {
    res.status(500).json({ message: "logged out failed!", error: err });
  }
}

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
    res.status(403).send("fobidden, doesn't permission");
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
  logoutController,
  forgotPasswordController,
  resetPasswordController
};
