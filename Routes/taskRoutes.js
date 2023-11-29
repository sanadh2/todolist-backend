const express = require("express");
const taskRoute = express.Router();
const { newTask, deleteTask, updateTask } = require("../Handlers/taskHandler");

taskRoute.post("/new-task", newTask);
taskRoute.patch("/update-task", updateTask);
taskRoute.delete("/delete-task", deleteTask);
module.exports = taskRoute;
