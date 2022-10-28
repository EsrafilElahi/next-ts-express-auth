const Users = require("../models/users");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {

  !req.cookies.jwt && res.status(401).send("unAuthorized!");
  const token = req.cookies.jwt;

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    !verifiedToken && res.status(403).send("invalid token inside try");
    req.id = verifiedToken.id;
    return next();
  } catch (err) {
    res.status(403).json({ msg: "invalid token!", error: err });
  }
};

const authAdmin = async (req, res, next) => {
  const user = await Users.findById(req.id);
  !user && user.status(401).send("user not found & not authorized!")
  if (user.isAdmin) next();
  res.status(401).send("not admin");
};

module.exports = {
  authenticate,
  authAdmin,
};
