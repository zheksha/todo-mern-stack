const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const todoRouter = require("./routes/todoRoutes");

app.use(express.json());

app.use(morgan("dev"));

app.use(cors());

app.use("/todos", todoRouter);

module.exports = app;
