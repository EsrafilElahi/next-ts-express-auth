const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserToken = require("../models/UserToken");


const refreshTokenController = async (req, res, next) => {
  // check token exist in userToken model
  const existRefreshToken = await UserToken.findOne({ where: { token: req.body.refreshToken } });
  !existRefreshToken && res.status(404).send("token not round in userToken db!");

  // verify token
  const verifiedToken = jwt.verify(existRefreshToken, process.env.JWT_SECRET_KEY);
  !verifiedToken && res.status(403).send("not refresh token!");

  try {
    // create new access token
    const accessToken = jwt.sign({ id: verifiedToken?.id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" })
    res.status(200).json({ message: 'create access token successfully!', accessToken })
  } catch (err) {
    res.status(500).json({ message: "err in create access token", error: err })
  }
}

const refreshTokenLogoutController = async (req, res, next) => {
  // check token exist in userToken model
  const existUserToken = await UserToken.findOne({ token: req.body.refreshToken });
  !existUserToken && res.status(404).send("token not found -> logged out successfully!")

  try {
    // remove token
    await existUserToken.destroy()
    res.status(200).send("logged out sucessfully");
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }

}

module.exports = {
  refreshTokenController,
  refreshTokenLogoutController
}