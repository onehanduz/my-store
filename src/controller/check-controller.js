const { Check } = require("../models");
const { Product } = require("../models");
const { Client } = require("../models");
const { Sell } = require("../models");

async function getAll() {
  const clients = await Client.findAll(1);
  const products = await Product.findAll();
  return { clients, products };
}

async function createDB(req) {
  const { clientId } = req.body;
  let price = 0;
  let amountProduct = 0;
  if (!clientId == "" || !clientId == "0") {
    const props = {
      clientId,
      price,
    };
    const sell = await Sell.create(props).catch((e) => {
      console.log(e);
    });
    const sellId = await sell[0].id;
    for (let i = 0; i < 50; i++) {
      const productId = req.body["mahsulot" + i];
      const amount = parseInt(req.body["soni" + i]);
      if (productId > 0 || !productId == undefined) {
        const productChecked = await Product.findById(productId);
        if (productChecked[0].id !== undefined) {
          const priceProduct = productChecked[0].price * amount;
          const productAmount = productChecked[0].amount - amount;
          await Product.update(productChecked[0].id, { amount: productAmount });
          price += priceProduct;
          amountProduct += amount;
          await Check.create({
            productId,
            sellId,
            amount,
            price: priceProduct,
          }).catch((e) => {
            console.log(e);
          });
        }
      }
    }
    await Sell.update(sellId, { price, amount: amountProduct });
  }
}

module.exports = { getAll, createDB };
