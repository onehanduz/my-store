const express = require("express");
const { getAll, getOne } = require("../controller/sell-controller");
const sellRouter = express.Router();

sellRouter.get("/", async (req, res) => {
  const sell = await getAll(1);
  res.render("sell/main", { sell: sell.sell, page: sell.page });
});
sellRouter.get("/page/:page", async (req, res) => {
  const sell = await getAll(req.params.page);
  res.render("sell/main", { sell: sell.sell, page: sell.page });
});
sellRouter.get("/:id", async (req, res) => {
  const sell = await getOne(req);
  res.render("sell/one", { ...sell });
});
module.exports = sellRouter;
