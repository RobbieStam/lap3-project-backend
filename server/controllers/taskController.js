const Task = require("../models/Task");

async function index(req, res) {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function create (req, res) {
  try {
      const task = await Task.create(req.body);
      res.status(201).json(task);
  } catch (err) {
      res.status(404).json({"error": err.message})
  }
}

module.exports = {
  index,
  create
};
