const app = require("express")();
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log("Server started");
});
