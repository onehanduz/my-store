module.exports.up = function (knex) {
  return knex.schema.createTable("check", (t) => {
    t.increments("id").primary();
    t.integer("sellId")
      .unsigned()
      .index()
      .references("id")
      .inTable("sell")
      .onDelete("SET NULL");
    t.integer("productId")
      .unsigned()
      .index()
      .references("id")
      .inTable("products")
      .onDelete("SET NULL");
    t.integer("price");
    t.integer("amount");
    t.timestamps();
  });
};

module.exports.down = function (knex) {
  return knex.schema.dropTableIfExists("check");
};
