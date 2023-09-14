const Task = require("../models/Task");

async function index(req, res) {
  try {
    const userId = req.user.userId;
    console.log("userId:", userId);
    const tasks = await Task.getAll(userId);
    console.log("tasks:", tasks);
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

const show = async (req, res) => {
  try {
    const idx = req.params.id;
    const tasks = await Task.getOne(idx);
    res.status(200).json({
      success: true,
      task: tasks,
    });
  } catch (e) {
    console.error(e);
    res.status(404).json({
      success: false,
      message: "Tasks not found",
      error: e,
    });
  }
};

const create = async (req, res) => {
  console.log("req.user in create function:", req.user);
  try {
    const data = req.body;
    data.userId = req.user.userId;
    const result = await Task.create(data);
    res.status(201).json({
      success: true,
      response: result,
    });
  } catch (e) {
    console.error(e);
    res.status(404).json({
      success: false,
      message: "Unable to create new task",
      error: e,
    });
  }
};

module.exports = {
  index,
  show,
  create,
};
