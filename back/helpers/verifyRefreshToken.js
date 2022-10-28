function verifyRefresh(id, token) {
  try {
    const verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    return verifiedToken.id === id;
  } catch (error) {
    return false;
  }
}
module.exports = { verifyRefresh };