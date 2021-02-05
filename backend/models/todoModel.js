const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Todo = new Schema({
  todo_description: {
    type: String,
    required: true,
  },
  todo_priority: {
    type: String,
    required: true,
  },
  todo_completed: {
    type: Boolean,
  },
  todo_created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Todo", Todo);
