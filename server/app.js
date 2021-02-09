const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use(morgan("dev"));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use("/todos", todoRouter);
app.use("/user", userRouter);

module.exports = app;
