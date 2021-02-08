const express = require("express");
const todoController = require("../controllers/todoController");
const auth = require("../middleware/auth");

const router = express.Router();

//Routes
router.route("/").post(auth, todoController.getAllTodos);

router.route("/create").post(auth, todoController.createTodo);

router
  .route("/:id")
  .get(auth, todoController.getTodo)
  .patch(auth, todoController.updateTodo)
  .delete(auth, todoController.deleteTodo);

module.exports = router;
