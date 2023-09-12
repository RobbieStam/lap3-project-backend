const { Router } = require("express");
const taskController = require("../controllers/taskController");

const taskRouter = Router();

taskRouter.get("/", taskController.index);

taskRouter.get("/:id", taskController.show);

taskRouter.post("/", taskController.create);

module.exports = taskRouter;
