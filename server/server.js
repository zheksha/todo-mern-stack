const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;
dotenv.config({ path: "./config.env" });

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://zheksha:surapbekova1992@todoappcluster.xppqm.mongodb.net/todoDB?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connection to DB established successfully"));

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
