const router = require("express").Router();
const cartRoutes = require("./cartRoutes");

router.use("/cart", cartRoutes);

module.exports = router;
