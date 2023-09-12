const { ObjectId } = require("mongodb");
const client = require("../database/setup-db");

class Task {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.mood = data.mood
    this.completed_at = data.completed_at
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

  static async create({ task, description }) {
    await client.connect();
    let date = new Date();
    let formattedDate =
      date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      " " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    const response = await client.db("tasks").collection("tasks").insertOne({
      task: task,
      description: description,
      mood: mood,
      completed_at: formattedDate,
    });
    return "Task created";
  }
}

module.exports = Task;
