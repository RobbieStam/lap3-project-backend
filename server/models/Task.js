const { ObjectId } = require("mongodb");
const client = require("../database/setup-db");

class Task {
  constructor(data) {
    this.id = data.id;
    this.task = data.task;
    this.description = data.description;
    this.completed_at = data.completed_at;
  }

  static async getAll() {
    await client.connect();
    const response = await client.db("tasks").collection("tasks").find();
    const allValues = await response.toArray();
    return allValues;
  }

  static async getOne(idx) {
    await client.connect();
    const id = new ObjectId(idx);
    const response = await client.db("tasks").collection("tasks").find({
      _id: id,
    });
    const value = await response.toArray();
    const task = new Task(value[0]);
    task["id"] = id;
    return task;
  }
}

module.exports = Task;
