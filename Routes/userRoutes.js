const express = require("express");
const userRoute = express.Router();
const {
  signUp,
  getusers,
  usersTasks,
  deleteUser,
  deleteUsers,
  login,
  getUser,
  userVerify,
} = require("../Handlers/userHandler");

userRoute.post("/new-user", signUp);

userRoute.post("/login", login);

userRoute.get("/verify", userVerify, getUser);

userRoute.get("/user-tasks", usersTasks);
userRoute.delete("/user-list", deleteUsers);
userRoute.delete("/user", deleteUser);
module.exports = userRoute;
