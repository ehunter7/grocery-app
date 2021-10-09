const express = require("express");
const router = express.Router();

//TODO need to create schema
// const Cart = require("../../models/cartSchema");

router.get("/items", async (req, res) => {
  res.send({ theServer: "hElLo FrOm YoUr ExPrEsS sErVeR" });
});

module.exports = router;
