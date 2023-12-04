const userModel = require("../Models/userModel");
const TaskModel = require("../Models/tasksModel");

const newTask = async (req, res, next) => {
  const { title, completed, userID } = req.body;
  if (!title || !userID)
    return res
      .status(400)
      .json({ success: false, msg: "Couldn't get enough data" });
  const userValid = await userModel.findById(userID);
  if (userValid.length == 0)
    return res
      .status(404)
      .json({ success: false, msg: `no user with id ${userID}` });

  const new_task = {
    title,
    completed,
    userID,
  };
  const task = await TaskModel.create(new_task);
  res.status(200).json({ succes: true, task });
};

const updateTask = async (req, res, next) => {
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
};

const deleteTask = async (req, res, next) => {
  const { id } = req.body;
  if (!id)
    return res
      .status(403)
      .json({ success: false, msg: "Didnot get the task id" });
  const task = await TaskModel.findByIdAndDelete(id);
  return res.status(200).json({ success: true, task });
};

const deleteAllTasks = async (req, res, next) => {
  const { id } = req.body;
  if (!id)
    return res.status(400).json({ success: false, msg: "Couldn't get ID" });

  await TaskModel.deleteMany({});
  return res.status(200).json({ success: true, msg: "All Tasks Deleted" });
};
module.exports = { newTask, deleteTask, updateTask, deleteAllTasks };
