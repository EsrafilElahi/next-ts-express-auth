const Users = require("../models/users");

const authenticate = async (req, res, next) => {
  // const token = req.header("jwt");
  const refresh_token = req.cookies.jwt
  !refresh_token && res.status(404).send("no token found!")

  try {
    const verifiedToken = await jwt.verify(refresh_token, process.env.JWT_SECRET_KEY)
    !verifiedToken && res.status(403).send("not Authorized!");
    console.log("user.user in authenticated middleware :", res.user)
    req.id = verifiedToken.id;
    return next();
  } catch (error) {
    res.status(403).send("invalid token");
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