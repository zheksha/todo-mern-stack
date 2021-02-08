const Todo = require("../models/todoModel");

//Get all todos
exports.getAllTodos = async (req, res) => {
  // const id = req.body.user.id;
  console.log(req.body);
  const todos = await Todo.find();
  try {
    res.status(200).json({
      status: "success",
      results: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(404).json({ status: "failed to get", message: error.message });
  }
};

// Get single todo
exports.getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: todo,
    });
  } catch (error) {
    res.status(404).json({ status: "failed", message: error.message });
    console.log(error);
  }
};

// Create todo
exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);
    res.status(201).json({
      status: "success",
      message: "successfully created new todo",
      data: {
        todo: newTodo,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Server error",
    });
  }
};

// Update todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ status: "success", data: { todo } });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

// Delete todo

exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res
      .status(400)
      .json({ status: "success", message: "item successfully deleted" });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};
