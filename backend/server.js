const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = express.Router();
const PORT = 4000;

let Todo = require("./todo.model");

const uri =
  "mongodb+srv://zheksha:surapbekova1992@todoappcluster.xppqm.mongodb.net/todoDB?retryWrites=true&w=majority";

app.use(cors());

// Header set Access-Control-Allow-Origin "*"

app.use(bodyParser.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Connection to DB established successfully");
});

todoRoutes.route("/").get(function (req, res) {
  Todo.find(function (err, todos) {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

todoRoutes.route("/:id").get(function (req, res, next) {
  let id = req.params.id;
  Todo.findById(id, function (err, todo) {
    res.json(todo);
  });
});

todoRoutes.route("/add").post(function (req, res) {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" });
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed");
    });
});

todoRoutes.route("/update/:id").post(function (req, res) {
  Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else {
      todo.todo_description = req.body.todo_description;
      todo.todo_priority = req.body.todo_priority;
      todo.todo_completed = req.body.todo_completed;

      todo
        .save()
        .then((todo) => {
          res.json("Todo updated");
        })
        .catch((err) => {
          res.status(400).send("Update not possible");
        });
    }
  });
});

todoRoutes.route("/delete/:id").delete(function (req, res) {
  Todo.findByIdAndDelete(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found");
    else {
      res.status(200).send("Task deleted");
    }
  });
});

app.use("/todos", todoRoutes);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
