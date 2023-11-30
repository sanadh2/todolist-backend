const bcrypt = require("bcryptjs");
const userModel = require("../Models/userModel");
const TaskModel = require("../Models/tasksModel");
const JWT = require("jsonwebtoken");
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

  const userToken = JWT.sign({ id: user._id }, process.env.MY_KEY, {
    expiresIn: "2d",
  });
  console.log("userToken: ", userToken, "/n");
  res.cookie(String(user._id), userToken, {
    sameSite: "lax",
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 300),
  });
  res.status(200).json({ success: true });
};

const userVerify = async (req, res, next) => {
  const cookie = req.headers.cookie;
  const userToken = cookie.split("=")[1];
  if (!userToken)
    return res.status(404).json({ success: false, msg: "Invalid Credentials" });
  JWT.verify(userToken.toString(), process.env.MY_KEY, (err, user) => {
    if (err)
      return res
        .status(404)
        .json({ success: false, msg: "Invalid Credentials" });
    console.log(user);

    req.id = user.id;
  });
  next();
};

const getUser = async (req, res, next) => {
  const { id } = req.body;
  const user = await userModel.findById(id, "-password");
  if (!user)
    return res
      .status(400)
      .json({ succes: false, msg: "Could not find the user" });
  res.status(200).json({ success: true, user });
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
  userVerify,
  getUser,
  signUp,
  usersTasks,
  deleteUser,
  deleteUsers,
  login,
};
