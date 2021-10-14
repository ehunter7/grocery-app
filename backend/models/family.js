const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FamilySchema = new Schema({
  familyName: String,
  members: [
    {
      id: mongoose.Types.ObjectId,
      userName: String,
      familyID: mongoose.Types.ObjectId,
      memberfamily: String,
    },
  ],
  cart: [
    {
      itemName: String,
      itemChecked: false,
      itemArea: String,
    },
  ],
  recipe: [
    {
      recipeName: String,
      recipeIngredients: [
        {
          ingredientsName: String,
          ingredientsAmount: Number,
          ingredientsAmountType: String,
        },
      ],
      recipeInstructions: String,
    },
  ],
  status: Boolean,
  currentArea: String,
  area: [String],
  hidden: Boolean,
});

const Family = mongoose.model("family", FamilySchema);
module.exports = Family;
