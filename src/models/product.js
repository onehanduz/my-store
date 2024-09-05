"use strict";

const createGuts = require("../helpers/model-guts");

const name = "Product";
const tableName = "products";

const selectableProps = [
  "id",
  "name",
  "price",
  "price_old",
  "amount",
  "created_at",
  "updated_at",
];

module.exports = (knex) => {
  const guts = createGuts({
    knex,
    name,
    tableName,
    selectableProps,
  });

  return {
    ...guts,
  };
};
