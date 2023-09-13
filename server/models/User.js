const { MongoClient, ObjectId } = require("mongodb");

const client = require("../database/setup-db");

class User {
  constructor({ userId, username, password, isAdmin }) {
    this.userId = userId;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  static async getOneById(id) {
    await client.connect();
    const db = client.db("pomodogo");
    const user = await db.collection("users").findOne({ _id: ObjectId(id) });
    if (!user) {
      throw new Error("Unable to locate user.");
    }
    return new User(user);
  }

  static async getOneByUsername(username) {
    await client.connect();
    const db = client.db("pomodogo");
    const user = await db.collection("users").findOne({ username: username });
    if (!user) {
      throw new Error("Unable to locate user.");
    }
    return new User(user);
  }

  static async create(data) {
    await client.connect();
    const db = client.db("pomodogo");
    const { username, password, isAdmin } = data;
    const result = await db
      .collection("users")
      .insertOne({ username, password, isAdmin });
    const newId = result.insertedId;
    return User.getOneById(newId);
  }
}

module.exports = User;
