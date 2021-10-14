const router = require("express").Router();
const cartRoutes = require("./cartRoutes");
const familyRoutes = require("./familyRoute");

router.use("/cart", cartRoutes);
router.use("/family", familyRoutes);

module.exports = router;
