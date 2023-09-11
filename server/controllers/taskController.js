const Task = require("../models/Task");

async function index(req, res) {
  try {
    const tasks = await Task.getAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  index,
};
