const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Auth route
const authRouter = require("./routes/authRouter");
app.use("/auth", authRouter);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server started");
});
