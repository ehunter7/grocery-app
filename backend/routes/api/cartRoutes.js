const express = require("express");
const router = express.Router();

const Cart = require("../../models/grocery");
const Family = require("../../models/family");

// gets all items ssaved in cart
router.get("/items", async (req, res) => {
  try {
    //TODO: Need to do more in the backend rather than passing everything to the front
    const allItems = await Family.find({ familyName: "Hunters" });
    res.json(allItems); //TODO: send only cart to global state
  } catch (error) {
    console.log("[ERROR] GET ITEMS", error);
  }
});

router.put("/addItem", async (req, res) => {
  console.log(req.body);
  // spread incoming item

  // ** const {itemName, itemChecked, itemArea } = req.body
  /** const incomingPayload = {
      name: itemName,
      checked: itemChecked,
      area: itemArea,
    }
    */

  // Check if area exist by trying to find area

  /** 
            let filter = {family.cart.data.name: itemArea};
            let update = incomingPayload;
            const opts = (new: true)

            let updatedCart = await Family.findoneandupdate(filter, update, opts)

    */

  // If area does not exist
  // add item to area

  /**  
      filter = {family.familyName: 'Hunters'};
      update = {     
        area: itemArea,
        itemChecked: itemChecked,
        itemCheckedCount: itemCheckedCount++,
        data: [
          incomingPayload
        ],}

      updateCart = await Family.findoneandupdate(filter, update, opts)
      */

  // End if
  //TODO: If item exists add "x2" to the item to indicate needing two items
  //TODO: Need to dump the results into global state
  try {
    const updateCart = await Family.findByIdAndUpdate(
      "616b48cd319d2d1df802f0e4", //ID for hunter family
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
