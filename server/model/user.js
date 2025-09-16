const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: string,
    required: true,
  },
  email: {
    type: string,
    required: true,
    unique: true,
  },
  password: {
    type: string,
    required: true,
    unique: true,
  },
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
