const { v4: uuidv4 } = require("uuid");
const { MongoClient, ObjectId } = require("mongodb");
const client = require("../database/setup-db");

class Token {
  constructor({ _id, userId, token }) {
    this.id = _id;
    this.userId = userId;
    this.token = token;
  }

  static async create(userId) {
    await client.connect();
    const db = client.db("pomodogo");
    const token = uuidv4();
    const result = await db
      .collection("tokens")
      .insertOne({ userId: new ObjectId(userId), token });
    return new Token({ _id: result.insertedId, userId, token });
  }

  static async getOneById(id) {
    await client.connect();
    const db = client.db("pomodogo");
    const tokenDoc = await db
      .collection("tokens")
      .findOne({ _id: new ObjectId(id) });
    if (!tokenDoc) {
      throw new Error("Unable to locate token.");
    }
    return new Token(tokenDoc);
  }

  static async getOneByToken(token) {
    await client.connect();
    const db = client.db("pomodogo");
    const tokenDoc = await db.collection("tokens").findOne({ token });
    if (!tokenDoc) {
      throw new Error("Unable to locate token.");
    }
    return new Token(tokenDoc);
  }
}

module.exports = Token;
