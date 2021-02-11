const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const path = require("path");

const todoRouter = require("./routes/todoRoutes");
const userRouter = require("./routes/userRoutes");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
}

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
