const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;
  !authHeader && res.status(401).send("token not found in header --> unauthorized!");
  const token = authHeader.split(" ")[1];

  console.log("authHeader :", authHeader)

  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    !verifiedToken && res.status(403).send("invalid token inside try");
    req.user = verifiedToken; // the verifiedToken is hamoon user
    next();
  } catch (err) {
    res.status(403).json({ msg: "invalid token!", error: err });
  }
};

const authAdmin = async (req, res, next) => {
  // set th req.user above in the authenticate middlware
  const user = req.user;
  if (user.isAdmin) next();
  res.status(401).send("not admin");
};

module.exports = {
  authenticate,
  authAdmin,
};
