const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
  user_name: {
    type: String,
    required,
  },
  user_email: {
    type: String,
    required,
  },
  user_password: {
    type: String,
    required,
  },
});

module.exports = mongoose.model("User", User);
