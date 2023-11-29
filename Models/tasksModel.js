const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: {
    type: String,
    required: [true, "A user should have a name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
});
const TasksModel = model("task", taskSchema);

module.exports = TasksModel;
