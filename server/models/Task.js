const { ObjectId } = require("mongodb");
const client = require("../database/setup-db");

class Task {
  constructor(data) {
    this.id = data.id;
    this.task = data.task;
    this.description = data.description;
    this.completed_at = data.completed_at;
  }

  static async getAll(userId) {
    await client.connect();
    const response = await client
      .db("pomodogo")
      .collection("tasks")
      .find({ userId: ObjectId(userId) });
    const allValues = await response.toArray();
    return allValues;
  }

  static async getOne(idx) {
    await client.connect();
    const id = new ObjectId(idx);
    const response = await client.db("pomodogo").collection("tasks").find({
      _id: id,
    });
    const value = await response.toArray();
    const task = new Task(value[0]);
    task["id"] = id;
    return task;
  }

  static async create({ userId, task, description }) {
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
    const response = await client
      .db("pomodogo")
      .collection("tasks")
      .insertOne({
        userId: ObjectId(userId),
        task: task,
        description: description,
        completed_at: formattedDate,
      });
    return "Task created";
  }
}

module.exports = Task;
