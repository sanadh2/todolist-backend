const bcrypt = require("bcryptjs");
const asyncWrapper = require("../Middlewares/async");
const userModel = require("../Models/userModel");
const TaskModel = require("../Models/tasksModel");

const getusers = asyncWrapper(async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json(users);
});
const newUser = asyncWrapper(async (req, res, next) => {
  const { name, email, password } = req.body;
  const encrptedPw = bcrypt.hashSync(password, 11);

  const new_user = {
    name: name,
    email: email,
    password: encrptedPw,
  };
  const user = await userModel.create(new_user);
  res.status(200).json({ success: true, user });
});

const usersTasks = asyncWrapper(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false });
  const tasks = await TaskModel.find({ email: email });
  res.status(200).json({ success: true, tasks });
  next();
});

module.exports = { newUser, getusers, usersTasks };
