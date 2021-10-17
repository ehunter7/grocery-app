const express = require("express");
const router = express.Router();

const Cart = require("../../models/grocery");
const Family = require("../../models/family");

// gets all items ssaved in cart
router.get("/items", async (req, res) => {
  try {
    const allItems = await Family.find({ familyName: "Hunters" });
    res.json(allItems);
  } catch (error) {
    console.log("[ERROR] GET ITEMS", error);
  }
});

router.put("/addItem", async (req, res) => {
  console.log(req.body);
  try {
    const updateCart = await Family.findByIdAndUpdate(
      "616b48cd319d2d1df802f0e4",
      {
        cart: req.body,
      }
    );

    res.json(updateCart);
  } catch (error) {
    console.log("error with add item", error);
  }
});

router.put("/checkoff", async (req, res) => {
  const { name, checked } = req.body;
  try {
    const updatedItem = await Family.findByIdAndUpdate({
      _id: "616b48cd319d2d1df802f0e4",
    });
    // res.json(updatedItem);
  } catch (error) {
    console.log("[ERROR] put('/checkoff')");
    console.log(error);
  }
});
module.exports = router;
