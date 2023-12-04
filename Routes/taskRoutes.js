const express = require("express");
const taskRoute = express.Router();
const { newTask, deleteTask, updateTask, deleteAllTasks } = require("../Handlers/taskHandler");

taskRoute.post("/new-task", newTask);
taskRoute.patch("/update-task", updateTask);
taskRoute.delete("/delete-task", deleteTask);
taskRoute.delete("/delete-all", deleteAllTasks);
module.exports = taskRoute;
