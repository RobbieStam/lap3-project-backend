const bcrypt = require("bcrypt");

const User = require("../models/User");
const Token = require("../models/Token");

async function register(req, res) {
  try {
    const data = req.body;

    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));

    data["password"] = await bcrypt.hash(data["password"], salt);

    const result = await User.create(data);

    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByEmail(data.email);
    if (!user) {
      console.log("No user found with this email");
      throw new Error("Incorrect credentials.");
    }
    console.log("User", user);

    const authenticated = await bcrypt.compare(data.password, user["password"]);
    console.log("Authenticated", authenticated);
    if (!authenticated) {
      console.log("Password does not match");
      throw new Error("Incorrect credentials.");
    }
    console.log("User object before token creation:", user);
    const token = await Token.create(user.userId);
    if (!token) {
      console.log("Token creation failed");
      throw new Error("Token creation failed");
    }
    console.log("Token created successfully", token);

    res.status(200).json({ authenticated: true, token: token.token });
  } catch (err) {
    console.error("Error in login route:", err);
    res.status(403).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
};
