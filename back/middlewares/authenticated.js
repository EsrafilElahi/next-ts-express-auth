const Users = require("../models/users");

const authenticate = async (req, res, next) => {
  // const token = req.header("jwt");
  const refresh_token = req.cookie.jwt
  !refresh_token && res.status(406).send("not Authorized!")

  try {
    const verifiedToken = await jwt.verify(refresh_token, process.env.JWT_SECRET_KEY)
    !verifiedToken && res.status(406).send("not Authorized!");
    console.log("user.user in authenticated middleware :", res.user)
    res.user = verifiedToken;
    next();
  } catch (error) {
    res.status(400).send("invalid token");
  }
};

const authAdmin = async (req, res, next) => {
  if (req.body.isAdmin) next();
  res.status(401).send("not admin")
}

module.exports = {
  authenticate,
  authAdmin
}