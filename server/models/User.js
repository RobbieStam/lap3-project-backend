const { MongoClient, ObjectId } = require("mongodb");

const client = require("../database/setup-db");

class User {
  constructor({ userId, name, username, email, password, isAdmin }) {
    this.userId = userId;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }

  static async getOneById(id) {
    await client.connect();
    const db = client.db("pomodogo");
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });
    if (!user) {
      throw new Error("Unable to locate user.");
    }
    return new User(user);
  }

  static async getOneByEmail(email) {
    await client.connect();
    const db = client.db("pomodogo");
    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      throw new Error("Unable to locate user.");
    }
    return new User(user);
  }

  static async create(data) {
    await client.connect();
    const db = client.db("pomodogo");

    const { name, username, email, password, isAdmin = false } = data;

    const result = await db.collection("users").insertOne({ ...data, isAdmin });

    const newId = result.insertedId;
    return new User({ ...data, userId: newId });
  }
}

module.exports = User;
