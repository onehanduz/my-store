"use strict";

const createGuts = require("../helpers/model-guts");

const name = "Sell";
const tableName = "sell";

const selectableProps = [
  "id",
  "clientId",
  "price",
  "amount",
  "updated_at",
  "created_at",
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  const getClient = (id) =>
    knex(tableName)
      .select("clients.id", "clients.address", "clients.name", "clients.phone")
      .innerJoin("clients", "clients.id", "sell.clientId")
      .where("sell.id", id);

  const getCheck = (id) =>
    knex(tableName)
      .select("check.productId", "check.price", "check.amount")
      .join("check", "check.sellId", "sell.id")
      .where("sell.id", id);

  return {
    ...guts,
    getClient,
    getCheck,
  };
};
