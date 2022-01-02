const express = require("express");
const router = express.Router();

const Cart = require("../../models/grocery");
const Family = require("../../models/family");

// gets all items saved in cart || getCartItems api call
router.get("/items", async (req, res) => {
  try {
    //TODO: Need to do more in the backend rather than passing everything to the front
    const allItems = await Family.find({ familyName: "Hunters" });
    res.json(allItems);
  } catch (error) {
    console.log("[ERROR] GET ITEMS", error);
  }
});

router.put("/addItem", async (req, res) => {
  console.log(req.body);
  // spread incoming item
  const { itemName, itemChecked, itemArea } = req.body;
  console.log("itemName", itemName);
  console.log("itemChecked", itemChecked);
  console.log("itemArea", itemArea);
  const incomingPayload = {
    name: itemName,
    checked: itemChecked,
    area: itemArea,
  };
  console.log("incomingpayload object", incomingPayload);
  console.log("Yop");
  // Check if area exist by trying to find area
  try {
    const family = Family.find({ familyName: "Hunters" });
    const cartItem = family.cart.data.name;
    let filter = { cartItem: itemArea };
    let update = incomingPayload;
    const opts = { new: true };
    let updatedCart = Family.findoneandupdate(filter, update, opts);
    res.status(200);
  } catch {
    console.log("didnt work or was not found in family. Mother fucker...");
  }
  console.log("updatedCart", updatedCart);
  // If area does not exist
  // add item to area
  filter = { familyName: "Hunters" };
  update = {
    area: itemArea,
    itemChecked: itemChecked,
    itemCheckedCount: itemCheckedCount++,
    data: [incomingPayload],
  };
  updateCart = await Family.findoneandupdate(filter, update, opts);
  // End if
  //TODO: If item exists add "x2" to the item to indicate needing two items
  //TODO: Need to dump the results into global state
  // try {
  //   console.log("yep");
  // ! OLD CODE, SAVE UNTIL NEW PORTION ABOVE WORKS
  //   const updateCart = await Family.findByIdAndUpdate(
  //     "616b48cd319d2d1df802f0e4", //ID for hunter family
  //     {
  //       cart: req.body,
  //     }
  //   );
  //   res.json(updateCart);
  // } catch (error) {
  //   console.log("error with add item", error);
  // }
});

router.put("/checkoff", async (req, res) => {
  const { name, checked } = req.body;
  try {
    const updatedCart = req.body.cart.map((item) => {
      if (item.itemName === req.body.data.name) {
        return { ...item, itemChecked: !item.itemChecked };
      }
      return item;
    });

    const updatedItem = await Family.findByIdAndUpdate(
      {
        _id: "616b48cd319d2d1df802f0e4",
      },
      {
        cart: updatedCart,
      }
    );
    res.json(updatedItem);
  } catch (error) {
    console.log("[ERROR] put('/checkoff')");
    console.log(error);
  }
});
module.exports = router;
