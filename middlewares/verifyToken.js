const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const tokenWithBearer = req.headers["authorization"];
  if (!tokenWithBearer) {
    return res.status(403).json({ error: "User not authenticated" });
  }
  const token = tokenWithBearer.split(" ")[1];
  try {
    const user = jwt.verify(token, "secret");
    req.user = user;
  } catch (error) {
    return res.status(403).json({ error: "User not authenticated" });
  }

  next();
};

module.exports = {
  verifyToken,
};
