const jwt = require("jsonwebtoken");
const UserRefreshTokens = require("../models/refreshToken");

// receive token, check it into db and verify it with jwt
function verifyRefreshToken(receivedRefreshToken) {
  return new Promise((reject, resolve) => {
    UserRefreshTokens.findOne({ token: receivedRefreshToken }, (err, doc) => {
      if (!doc) {
        return reject("refreshToken not found!")
      }
      jwt.verify(receivedRefreshToken, process.env.SECRET_KEY, (err, refreshToken) => {
        if (err) {
          return reject("invalid refresh tokne!")
        }
        resolve({ verifiedRefreshToken: refreshToken, message: "valid token successfully!" })
      })
    });

  })


}

// other way to verify token
// // 1 - find token
// const foundedRefreshToken = await UserRefreshTokens.findOne({ token: receivedRereshToken });
// !foundedRefreshToken && res.status(404).send("token not found in db!");

// // 2 - verify token
// const verifiedRefreshToken = jwt.verify(receivedRereshToken, process.env.SECRET_KEY)

// // 3 - create new access token
// const newAccesToken = jwt.sign({ id: verifiedRefreshToken?._id }, process.env.SECRET_KEY, { expiresIn: "10m" })


module.exports = { verifyRefreshToken };