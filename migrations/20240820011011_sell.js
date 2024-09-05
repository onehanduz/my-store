module.exports.up = function (knex) {
  return knex.schema.createTable("sell", (t) => {
    t.increments("id").primary();
    t.integer("clientId")
      .unsigned()
      .index()
      .references("id")
      .inTable("clients")
      .onDelete("SET NULL");
    t.integer("price");
    t.integer("amount");
    t.timestamps();
  });
};

module.exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sell");
};
