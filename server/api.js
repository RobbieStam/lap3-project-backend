const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const taskRouter = require("./routes/taskRoutes");
const userRouter = require("./routes/user");
//const postRouter = require("./routes/post");

const api = express();

api.use(cors());
api.use(express.json());
api.use(logger("dev"));
const logRoutes = require("./middleware/logger");

api.get("/", (req, res) => {
  res.json({
    name: "PomoDogo",
    description: "See your tasks",
  });
});
console.log({ taskRouter, userRouter });

api.use("/tasks", taskRouter);
api.use("/users", userRouter);
api.use(logRoutes);

module.exports = api;
