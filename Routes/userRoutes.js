const express = require("express");
const userRoute = express.Router();
const { newUser, getusers, usersTasks } = require("../Handlers/userHandler");

userRoute.get("/user-list", getusers);
userRoute.post("/new-user", newUser);
userRoute.get("/user-tasks", usersTasks);
module.exports = userRoute;
