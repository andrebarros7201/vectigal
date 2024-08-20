const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Server started");
});
