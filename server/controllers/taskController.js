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
  try {
    const data = req.body;
    const result = await Task.create(data);
    res.status(201).json({
      success: true,
      response: result,
    });
  } catch (e) {
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
