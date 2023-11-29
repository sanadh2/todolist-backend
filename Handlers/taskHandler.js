const asyncWrapper = require("../Middlewares/async");
const userModel = require("../Models/userModel");
const TaskModel = require("../Models/tasksModel");

const newTask = asyncWrapper(async (req, res, next) => {
  const { title, completed, email } = req.body;
  const userValid = await userModel.find({ email });
  if (userValid.length == 0)
    return res
      .status(403)
      .json({ success: false, msg: `no user with id ${userID}` });

  const new_task = {
    title: title,
    completed: completed,
    email: email,
  };
  const task = await TaskModel.create(new_task);
  res.status(200).json({ succes: true, task });
  next();
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id, title, completed } = req.body;
  if (!id)
    return res
      .status(403)
      .json({ success: false, msg: "Didnot get enough data" });
  const task = await TaskModel.findByIdAndUpdate(
    id,
    { title, completed },
    { new: true }
  );
  return res.status(200).json({ success: true, task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.body;
  console.log(id);

  if (!id)
    return res
      .status(403)
      .json({ success: false, msg: "Didnot get the task id" });
  const task = await TaskModel.findByIdAndDelete(id);
  return res.status(200).json({ success: true, task });
});

module.exports = { newTask, deleteTask,updateTask };
