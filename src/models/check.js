"use strict";

const createGuts = require("../helpers/model-guts");

const name = "Check";
const tableName = "check";

const selectableProps = [
  "id",
  "sellId",
  "productId",
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
  const getProduct = (id) =>
    knex(tableName)
      .select("products.name", "products.price")
      .join("products", "check.productId", "products.id")
      .where("check.productId", id);

  return {
    ...guts,
    getProduct,
  };
};
