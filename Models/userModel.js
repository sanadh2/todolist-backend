const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "A user should have a name"],
    minlength: 3,
    maxlength: 20,
  },
  email: {
    type: String,
    required: [true, "A user should have a name"],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});
const userModel = model("user", userSchema);

module.exports = userModel;
