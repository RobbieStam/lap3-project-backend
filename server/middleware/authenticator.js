// const Token = require("../models/Token");

// async function authenticator(req, res, next) {
//   try {
//     const userToken = req.headers["authorization"];
//     console.log("User Token: ", userToken);
//     if (userToken == "null") {
//       throw new Error("User not authenticated.");
//     } else {
//       const validToken = await Token.getOneByToken(userToken);
//       console.log("Valid Token: ", validToken);
//       req.user = { userId: validToken.user_id }; // Setting the userId in req.user object
//       next();
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ error: err.message });
//   }
// }

// module.exports = authenticator;

const Token = require("../models/Token");

async function authenticator(req, res, next) {
  try {
    const userToken = req.headers["authorization"];

    if (userToken == "null") {
      throw new Error("User not authenticated.");
    } else {
      const validToken = await Token.getOneByToken(userToken);

      next();
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

module.exports = authenticator;
