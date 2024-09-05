module.exports.up = function (knex) {
  return knex.schema.createTable("products", (t) => {
    t.increments("id").primary();
    t.string("name");
    t.integer("price");
    t.integer("price_old");
    t.integer("amount");
    t.timestamps();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
module.exports.down = function (knex) {
  return knex.schema.dropTableIfExists("products");
};
