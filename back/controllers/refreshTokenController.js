const jwt = require("jsonwebtoken");
const UserRefreshTokens = require("../models/refreshToken");
const Users = require("../models/users");


const refreshTokenController = async (req, res) => {

  const receivedRereshToken = req.body.refreshToken;
  !receivedRereshToken && res.status(401).json({ error: "Authorization failed" })

  // 1 - find token in token's array in user model --> way 1
  const userTokens = await Users.find({ refreshTokens: receivedRereshToken })
  !userTokens && res.status(403).json({ error: "token not found in user db refreshTokens array" })

  // 1 - find token in refreshToken model --> way 2
  const foundedRefreshToken = await UserRefreshTokens.findOne({ token: receivedRereshToken });
  !foundedRefreshToken && res.status(404).json({ error: "token not found in tokenDB!" });

  // 2 - verify token
  const verifiedRefreshToken = jwt.verify(receivedRereshToken, process.env.SECRET_KEY)
  const verifiedRefreshToken2 = jwt.verify(userTokens, process.env.SECRET_KEY)

  try {
    // 3 - create new access token
    const newAccessToken = jwt.sign({ id: verifiedRefreshToken?._id }, process.env.SECRET_KEY, { expiresIn: "10m" })

    res.status(201).json({ message: "created new access token", accessToken: newAccessToken })
  } catch (err) {
    // remove the token
    const refreshToken = await UserRefreshTokens.findOne({ token: req.body.refreshToken });
    await refreshToken.remove();
    res.status(403).json({ message: 'Refresh token expired', error: err })
  }
}

const logoutController = async (req, res) => {
  try {
    // delete cookie
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === "production" });

    // const cookies = req.cookies;
    // !cookies?.jwt && res.status(201).send("No Cookies Content!");
    // const cookieRefreshToken = cookies.jwt;

    // find token in token's array in user model --> way 1
    const userTokens = await Users.find({ refreshTokens: req.body.refreshToken })
    !userTokens && res.status(403).json({ error: "token not found in user db refreshTokens array" })

    // check refresh token in db and delete the token --> way 2
    const refreshToken = await UserRefreshTokens.findOne({ token: req.body.refreshToken });
    !refreshToken && res.status(200).send("token not found - logged out successfully!");

    // remove the token
    await refreshToken.remove()
    res.status(200).send("token found and deleted - logged out successfully!");

  } catch (err) {
    res.status(500).json({ message: "logged out failed!", error: err });
  }
}

module.exports = {
  refreshTokenController,
  logoutController
}