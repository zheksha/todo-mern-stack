const mongoose = require("mongoose");
const User = require("./userModel");
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  todo_user: {
    type: Schema.Types.ObjectId,
    ref: User,
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
