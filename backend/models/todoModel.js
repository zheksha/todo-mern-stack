const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const TodoSchema = new Schema({
  todo_user: {
    ref: User,
    type: Schema.Types.ObjectId,
    required: true,
  },
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

module.exports = mongoose.model("Todo", TodoSchema);
