const jwt = require("jsonwebtoken");
const UserRefreshTokens = require("../models/refreshToken");
import Users from "../models/users";

const generateTokens = async (user) => {
  try {
    // create access token and refersh token
    const accessToken = jwt.sign({ id: user?._id }, process.env.SECRET_KEY, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ id: user?._id }, process.env.SECRET_KEY, { expiresIn: "30d" });

    // set refreshToken in User's refreshTokens array
    const savedUserTokens = await Users.updateOne(
      { _id: user?._id },
      { $push: { refreshTokens: refreshToken } }
    );
    await savedUserTokens.save();

    // check refresh token exist into UserRefreshTokens, if exist remove it
    const userToken = await UserRefreshTokens.findOne({ userID: user?._id });
    userToken && await userToken.remove()

    //  now create new refreshToken and save it
    const newRefreshToken = new UserRefreshTokens({ userID: user?._id, token: refreshToken })
    await newRefreshToken.save();

    // finally resolve both two tokens
    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject('err in generate tokens :', err);
  }
};

module.exports = generateTokens;
