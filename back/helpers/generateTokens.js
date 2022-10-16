const jwt = require("jsonwebtoken");
const UserToken = require("../models/UserToken");

const generateTokens = async (user) => {
  try {
    // create access token and refersh token
    const accessToken = jwt.sign({ id: user?.Id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ id: user?.id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

    // check token in userToken exist --> if exist => remove it
    const tokenExist = await UserToken.findOne({ where: { id: user?.id } })
    tokenExist && await tokenExist.destroy()

    // create new token and save it
    const savedToken = new UserToken({ id: user?.id, token: refreshToken });
    await savedToken.save()

    return Promise.resolve({ accessToken, refreshToken })
  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = generateTokens