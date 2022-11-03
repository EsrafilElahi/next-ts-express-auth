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
module.exports = { verifyRefreshToken };