const { changer } = require("../helpers/date-changer");
const { moneyChanger } = require("../helpers/to-money");
const { Client } = require("../models");

async function getAll() {
  return await Client.findAll();
}

async function getOne(req) {
  const id = parseInt(req.params.id);
  if (!id == "" || !id == NaN) return await Client.findById(id);
}

async function getSell(req) {
  const id = parseInt(req.params.id);
  if (!id == "" || !id == NaN) {
    const idpage = parseInt(req.params.page) || 1;
    const sell = await Client.getSell(id, idpage);
    const sellAll = await Client.getSellAll(id);
    sell.forEach(async (context) => {
      context.created_at = changer(context.created_at);
      context.price = moneyChanger(context.price);
    });
    let page = [];
    let b = Math.ceil(sellAll.length / 100);
    for (let i = 1; i <= b; i++) page.push({ pageNumber: i });
    return { sell, page: page };
  }
}

async function createDB(req) {
  const { name, address, phone } = req.body;
  if (!name == "" && !address == "" && !phone == "") {
    const props = {
      name,
      address,
      phone,
    };
    await Client.create(props).catch((e) => {
      console.log(e);
    });
  }
}

async function updateDB(req) {
  const id = parseInt(req.params.id);
  const old = await getOne(req);
  const name = req.body.name || old[0].name;
  const phone = req.body.phone || old[0].phone;
  const address = req.body.address || old[0].address;
  const props = {
    name,
    phone,
    address,
  };
  await Client.update(id, props).catch((e) => {
    console.log(e);
  });
}

async function deleteDB(req) {
  const id = parseInt(req.params.id);
  await Client.destroy(id).catch((e) => {
    console.log(e);
  });
}

module.exports = { getAll, getOne, createDB, updateDB, deleteDB, getSell };
