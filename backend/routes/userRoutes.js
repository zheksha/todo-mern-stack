const express = require("express");
const cors = require("cors");
const userController = require("../controllers/userController");

const router = express.Router();

//Routes
router.route("/signup").post(userController.signUpNewUser);
router.route("/login").post(userController.loginUser);
router.route("/delete").delete(userController.deleteUser);

module.exports = router;
