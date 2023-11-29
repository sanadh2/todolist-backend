const bcrypt = require("bcryptjs");
const userModel = require("../Models/userModel");
const TaskModel = require("../Models/tasksModel");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, msg: "Couldn't get enough data" });
  const user = await userModel.findOne({ email });
  if (!user)
    return res
      .status(400)
      .json({ success: false, msg: `No user with email ${email}` });
  const verify = await bcrypt.compareSync(password, user.password);
  if (!verify)
    return res.status(400).json({ success: false, msg: `Incorrect Password` });

  const { password: userPassword, ...userRes } = user;

  res.status(200).json({ success: true, user: user });
};

const getusers = async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json(users);
};
const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const encrptedPw = bcrypt.hashSync(password, 11);

  const new_user = {
    name: name,
    email: email,
    password: encrptedPw,
  };
  const user = await userModel.create(new_user);
  res.status(200).json({ success: true, user });
};
const deleteUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOneAndDelete({ email });
  console.log(user);

  await TaskModel.deleteMany({ email }).then(() => console.log("deleted"));
  if (user) return res.status(200).json({ success: true, user });
  return res.status(404).json({ success: false });
};

const deleteUsers = async (req, res, next) => {
  const user = await userModel.deleteMany({});
  await TaskModel.deleteMany({}).then(() => console.log("deletedAll"));
  if (user) return res.status(200).json({ success: true, user });
  return res.status(404).json({ success: false });
};

const usersTasks = async (req, res, next) => {
  const { email } = req.body;
  if (!email)
    return res.status(400).json({ success: false, msg: "Enter the email" });
  const tasks = await TaskModel.find({ email: email });
  res.status(200).json({ success: true, tasks });
  next();
};

module.exports = {
  signUp,
  getusers,
  usersTasks,
  deleteUser,
  deleteUsers,
  login,
};
