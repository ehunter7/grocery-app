const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/groceryDB", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const todosRouter = require("./routes/todos");
app.use("/todos", todosRouter);

app.get("/get", (req, res) => {
  res.send({ theServer: "hElLo FrOm YoUr ExPrEsS sErVeR" });
});
app.post("/wow/post", (req, res) => {
  console.log(req.body);
  res.send(`Here is what you sent me: ${req.body.post}`);
});

app.listen(port, () => console.log(`LiStEnInG on pOrT ${port}`));
