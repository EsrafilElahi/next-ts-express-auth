const jwt = require("jsonwebtoken");

const generateTokens = (user) => {
  try {
    const accessToken = jwt.sign({ userId: user?.Id }, process.env.JWT_SECRET_KEY, { expiresIn: "10m" });
    const refreshToken = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

    return Promise.resolve({ accessToken, refreshToken })

  } catch (err) {
    return Promise.reject(err)
  }
}

module.exports = generateTokens