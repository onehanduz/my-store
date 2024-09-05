const { changer } = require("../helpers/date-changer");
const { moneyChanger } = require("../helpers/to-money");
const { Sell } = require("../models");
const { Check } = require("../models");
const { Product } = require("../models");

async function getAll(idpage) {
  const sellAll = await Sell.findAll();
  let page = [];
  let b = Math.ceil(sellAll.length / 100);
  for (let i = 1; i <= b; i++) page.push({ pageNumber: i });
  const sell = await Sell.findAllWith(idpage);
  sell.forEach(async (context) => {
    const client = await Sell.getClient(context.id);
    context.created_at = changer(context.created_at);
    context.price = moneyChanger(context.price);
    context.clientName = client[0].name;
  });
  return { sell, page };
}

async function getOne(req) {
  const id = parseInt(req.params.id);
  if (!id == "" || !id == NaN) {
    const sell = (await Sell.findById(id))[0];
    sell.created_at = changer(sell.created_at);
    sell.price = moneyChanger(sell.price);
    if (sell.id > 0) {
      const client = (await Sell.getClient(sell.id))[0];
      const check = await Sell.getCheck(sell.id);
      check.forEach(async (checky) => {
        const productChecked = await Product.findById(checky.productId);
        if ((productChecked) => 0) {
          checky.productName = productChecked[0].name;
          checky.price = moneyChanger(checky.price);
        }
      });
      return { check, sell, client };
    }
  }
}

module.exports = { getAll, getOne };
