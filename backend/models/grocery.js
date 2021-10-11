const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroceryItem = new Schema({
  name: String,
  checked: false,
  area: String,
});

const CartItem = mongoose.model("groceryitem", GroceryItem);
module.exports = CartItem;
