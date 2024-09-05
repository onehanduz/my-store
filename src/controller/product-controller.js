const { Product } = require("../models");

async function getAll(idpage) {
  const product = await Product.findAll();
  let page = [];
  let b = Math.ceil(product.length / 100);
  console.log(b);
  for (let i = 1; i <= b; i++) page.push({ pageNumber: i });
  const productPage = await Product.findAllWith(idpage);
  return { products: productPage, page };
}

async function getOne(req) {
  const id = parseInt(req.params.id);
  if (!id == "" || !id == NaN) return await Product.findById(id);
}

async function createDB(req) {
  const { name, price, price_old, amount } = req.body;
  if (!name == "" && !price == "" && !price_old == "" && !amount == "") {
    const props = {
      name,
      price: parseInt(price),
      price_old: parseInt(price_old),
      amount: parseInt(amount),
    };
    await Product.create(props).catch((e) => {
      console.log(e);
    });
  }
}

async function updateDB(req) {
  const id = parseInt(req.params.id);
  const old = await getOne(req);
  const name = req.body.name || old[0].name;
  const price = req.body.price || old[0].price;
  const price_old = req.body.price_old || old[0].price_old;
  const amount = req.body.amount || old[0].amount;
  const props = {
    name,
    price: parseInt(price),
    price_old: parseInt(price_old),
    amount: parseInt(amount),
  };
  await Product.update(id, props).catch((e) => {
    console.log(e);
  });
}

async function deleteDB(req) {
  const id = parseInt(req.params.id);
  await Product.destroy(id).catch((e) => {
    console.log(e);
  });
}

module.exports = { getAll, getOne, createDB, updateDB, deleteDB };
