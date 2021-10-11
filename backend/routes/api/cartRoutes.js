const express = require("express");
const router = express.Router();

//TODO need to create schema
const Cart = require("../../models/grocery");

// gets all items ssaved in cart
router.get("/items", async (req, res) => {
  try {
    const allItems = await Cart.find({});
    res.json(allItems);
  } catch (error) {
    console.log("[ERROR] GET ITEMS", error);
  }
});

router.post("/addItem", async (req, res) => {
  const { name, area } = req.body;
  console.log(name);
  try {
    const item = new Cart({
      name: name,
      checked: false,
      area: area,
    });

    await item.save();
    res.json(item);
    // res.send({ theServer: "Add item has been called!@!" });
  } catch (error) {
    console.log("error with add item", error);
  }
});

module.exports = router;
