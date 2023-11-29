const express = require("express");
const userRoute = express.Router();
const {
  signUp,
  getusers,
  usersTasks,
  deleteUser,
  deleteUsers,
  login,
} = require("../Handlers/userHandler");

userRoute.get("/user-list", getusers);
userRoute.post("/new-user", signUp);
userRoute.post("/login", login);
userRoute.get("/user-tasks", usersTasks);
userRoute.delete("/user-list", deleteUsers);
userRoute.delete("/user", deleteUser);
module.exports = userRoute;
