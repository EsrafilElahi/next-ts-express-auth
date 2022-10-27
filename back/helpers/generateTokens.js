const jwt = require("jsonwebtoken");

const generateTokens = async (user) => {
  try {
    // create access token and refersh token
    const accessToken = jwt.sign({ id: user?._Id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "10m",
    });
    const refreshToken = jwt.sign(
      { id: user?._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );

    return Promise.resolve({ accessToken, refreshToken });
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = generateTokens;
