"use strict";

const createGuts = require("../helpers/model-guts");

const name = "Client";
const tableName = "clients";

const selectableProps = [
  "id",
  "name",
  "address",
  "phone",
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

  const getSell = (id, page) =>
    knex(tableName)
      .select("*")
      .innerJoin("sell", "clients.id", "sell.clientId")
      .where("clients.id", id)
      .orderBy("sell.created_at", "desc")
      .limit(100)
      .offset((page - 1) * 100);
  const getSellAll = (id) =>
    knex(tableName)
      .select("*")
      .innerJoin("sell", "clients.id", "sell.clientId")
      .where("clients.id", id);
  return {
    ...guts,
    getSell,
    getSellAll,
  };
};
