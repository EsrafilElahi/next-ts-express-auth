const jwt = require("jsonwebtoken");
const UserRefreshTokens = require("../models/refreshToken");
const verifyRefreshToken = require("../helpers/verifyRefreshToken");


const refreshTokenController = async (req, res) => {
  // check refreshToken verified
  const { verifiedRefreshToken } = verifyRefreshToken(req.body.refreshToken)
  try {
    // create accessToken
    const newAccessToken = jwt.sign({ id: verifiedRefreshToken?._id }, process.env.SECRET_KEY, { expiresIn: "10m" })

    res.status(201).json({ message: "created new access token", accessToken: newAccessToken })
  } catch (err) {
    res.status(500).json({ message: 'err in generate new access token', error: err })
  }
}

const logoutController = async (req, res) => {
  try {
    // const cookies = req.cookies;
    // !cookies?.jwt && res.status(201).send("No Cookies Content!");
    // const cookieRefreshToken = cookies.jwt;

    // check refresh token in db and delete the token
    const refreshToken = await UserRefreshTokens.findOne({ token: req.body.refreshToken });
    !refreshToken && res.status(200).send("token not found - logged out successfully!");
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production" });

    // remove the token
    await refreshToken.remove()
    res.status(200).send("token found and deleted - logged out successfully!");
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production" });

  } catch (err) {
    res.status(500).json({ message: "logged out failed!", error: err });
  }
}

module.exports = {
  refreshTokenController,
  logoutController
}