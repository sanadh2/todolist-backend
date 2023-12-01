const express = require("express");
const userRoute = express.Router();
const {
  signUp,
  usersTasks,
  deleteUser,
  deleteUsers,
  login,
  getUser,
  userVerify,
  refreshToken,
} = require("../Handlers/userHandler");

userRoute.post("/signUp", signUp);

userRoute.post("/login", login);

userRoute.get("/verify", userVerify, getUser);

userRoute.get("/refresh", refreshToken, getUser);

userRoute.get("/user-tasks/:userID", usersTasks);
userRoute.delete("/user-list", deleteUsers);
userRoute.delete("/user", deleteUser);
module.exports = userRoute;
