const express = require("express");
const router = express.Router();
const productRouter = require("./product-route");
const clientRouter = require("./client-route");
const sellRouter = require("./sell-route");
const checkRouter = require("./check-route");

router.use("/product", productRouter);
router.use("/client", clientRouter);
router.use("/sell", sellRouter);
router.use("/check", checkRouter);
router.use("/", (req, res) => res.redirect("/check"));

module.exports = router;
