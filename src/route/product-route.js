const express = require("express");
const {
  getAll,
  getOne,
  createDB,
  updateDB,
  deleteDB,
} = require("../controller/product-controller");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  const products = await getAll(1);
  res.render("product/product", {
    products: products.products,
    page: products.page,
  });
});
productRouter.get("/page/:page", async (req, res) => {
  const products = await getAll(req.params.page);
  res.render("product/product", {
    products: products.products,
    page: products.page,
  });
});
productRouter.get("/add", async (req, res) => {
  res.render("product/product-add");
});
productRouter.get("/update/:id", async (req, res) => {
  const product = (await getOne(req))[0];
  res.render("product/product-update", { product });
});
productRouter.post("/", (req, res) => {
  const creater = createDB(req);
  res.redirect("/product");
});
productRouter.post("/update/:id", (req, res) => {
  const update = updateDB(req);
  res.redirect("/product");
});
productRouter.get("/:id", async (req, res) => {
  const product = await getOne(req);
  res.end(JSON.stringify(product));
});

productRouter.get("/delete/:id", (req, res) => {
  const delet = deleteDB(req);
  res.redirect("/product");
});
module.exports = productRouter;
