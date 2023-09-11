const { Router } = require("express");

const taskRouter = Router();
const taskController = require("../controllers/taskController");

taskRouter.get("/", taskController.index);

module.exports = taskRouter;
