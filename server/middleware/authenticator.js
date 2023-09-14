const Token = require("../models/Token");

async function authenticator(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];

    if (
      !authHeader ||
      authHeader === "null" ||
      authHeader.startsWith("Bearer ") === false
    ) {
      throw new Error("User not authenticated.");
    }

    const userToken = authHeader.split(" ")[1];

    const validToken = await Token.getOneByToken(userToken);
    if (!validToken) {
      throw new Error("Invalid token.");
    }

    req.user = validToken;
    console.log("req.user in authenticator:", req.user);

    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
