const express = require("express");
const router = express.Router();

const Family = require("../../models/family");

router.post("/newFamily", async (req, res) => {
  console.log("YAY! New Family");

  try {
    const newFamily = new Family({
      familyName: "Hunters",
      status: false,
      hidden: true,
    });
    await newFamily.save();
    res.json(newFamily);
  } catch (error) {
    console.log("[ERROR] FAMILY POST ROUTE");
    console.log(error);
  }
});

module.exports = router;
