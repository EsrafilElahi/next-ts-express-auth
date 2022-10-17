const Users = require("../models/users");

const authenticate = async (req, res, next) => {
  const authHeader = req.headers["authorization" || "Authorization"];
  !authHeader && res.status(404).send("token not found!");
  const token = authHeader.split(" ")[1];

  try {
    const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    !verifiedToken && res.status(403).send("invalid token!");
    console.log("user.user in authenticated middleware :", res.user);
    req.user = verifiedToken.id;
    return next();
  } catch (err) {
    res.status(403).send("invalid token!", err);
  }
};

const authAdmin = async (req, res, next) => {
  if (req.body.isAdmin) next();
  res.status(401).send("not admin");
};

module.exports = {
  authenticate,
  authAdmin,
};
