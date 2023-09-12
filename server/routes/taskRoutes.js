const { Router } = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = Router();

taskRouter.get("/", taskController.index);

module.exports = taskRouter;
