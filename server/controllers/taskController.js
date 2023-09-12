const Task = require("../models/Task");

async function index(req, res) {
  try {
    const tasks = await Task.getAll();
    res.status(200).json({
      success: true,
      task: tasks,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      message: "Tasks not available right now",
      error: e,
    });
  }
}

module.exports = {
  index,
};
