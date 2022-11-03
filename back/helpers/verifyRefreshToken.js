function verifyRefresh(id, token) {
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    verifiedToken && true;
  } catch (error) {
    return false;
  }
}
module.exports = { verifyRefresh };