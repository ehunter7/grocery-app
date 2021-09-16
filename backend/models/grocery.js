const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroceryItem = new Schema({
  name: String,
  area: String,
});

const GroceryItem = mongoose.model("groceryitem", GroceryItem);
module.exports = GroceryItem;
