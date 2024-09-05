module.exports.up = function (knex) {
  return knex.schema.createTable("clients", (t) => {
    t.increments("id").primary();
    t.string("name");
    t.string("address");
    t.string("phone");
    t.timestamps();
  });
};

module.exports.down = function (knex) {
  return knex.schema.dropTableIfExists("clients");
};
