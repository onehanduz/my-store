const express = require("express");
const {
  getAll,
  getOne,
  createDB,
  updateDB,
  deleteDB,
  getSell,
} = require("../controller/client-controller");
const clientRouter = express.Router();

clientRouter.get("/", async (req, res) => {
  const clients = await getAll();
  res.render("client/main", { clients });
});
clientRouter.get("/add", async (req, res) => {
  res.render("client/add");
});
clientRouter.get("/update/:id", async (req, res) => {
  const client = (await getOne(req))[0];
  res.render("client/update", { client });
});
clientRouter.post("/", (req, res) => {
  const creater = createDB(req);
  res.redirect("/client");
});
clientRouter.post("/update/:id", (req, res) => {
  const update = updateDB(req);
  res.redirect("/client");
});
clientRouter.get("/:id", async (req, res) => {
  const client = (await getOne(req))[0];
  const sell = await getSell(req);
  res.render("client/one", { client, sell: sell.sell, page: sell.page });
});
clientRouter.get("/:id/page/:page", async (req, res) => {
  const client = (await getOne(req))[0];
  const sell = await getSell(req);
  res.render("client/one", { client, sell: sell.sell, page: sell.page });
});

clientRouter.get("/delete/:id", (req, res) => {
  const delet = deleteDB(req);
  res.redirect("/client");
});
module.exports = clientRouter;
