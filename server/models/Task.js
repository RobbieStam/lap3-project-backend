("mongodb");
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
    const response = await client.db("task").collection("task").find();
    const allValues = await response.toArray();
    return allValues;
  }
}

module.exports = Task;
