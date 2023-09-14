const { Router } = require("express");
const taskController = require("../controllers/taskController");

const authenticator = require("../middleware/authenticator");
const taskRouter = Router();

taskRouter.get("/", authenticator, taskController.index);
// taskRouter.post("/", taskController.create);

taskRouter.get("/:id", taskController.show);

taskRouter.post("/", authenticator, taskController.create);

module.exports = taskRouter;
