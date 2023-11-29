const express = require("express");
const userRoute = express.Router();
const {
  newUser,
  getusers,
  usersTasks,
  deleteUser,
  deleteUsers,
} = require("../Handlers/userHandler");

userRoute.get("/user-list", getusers);
userRoute.post("/new-user", newUser);
userRoute.get("/user-tasks", usersTasks);
userRoute.delete("/user-list", deleteUsers);
userRoute.delete("/user", deleteUser);
module.exports = userRoute;
