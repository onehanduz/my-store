"use strict";

module.exports = ({
  knex = {},
  name = "name",
  tableName = "tablename",
  selectableProps = [],
  timeout = 1000,
}) => {
  const create = (props) => {
    const time = new Date().toISOString();
    return knex
      .insert({
        ...props,
        created_at: time,
        updated_at: time,
      })
      .returning(selectableProps)
      .into(tableName)
      .timeout(timeout);
  };

  const findAll = () =>
    knex
      .select(selectableProps)
      .from(tableName)
      .orderBy("created_at", "desc")
      .timeout(timeout);

  const findAllWith = (page) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .orderBy("created_at", "desc")
      .limit(100)
      .offset((page - 1) * 100)
      .timeout(timeout);

  const find = (filters) =>
    knex
      .select(selectableProps)
      .from(tableName)
      .where(filters)
      .timeout(timeout);

  // Same as `find` but only returns the first match if >1 are found.
  const findOne = (filters) =>
    find(filters).then((results) => {
      if (!Array.isArray(results)) return results;

      return results[0];
    });

  const findById = (id) =>
    knex.select(selectableProps).from(tableName).where({ id }).timeout(timeout);

  const update = (id, props) => {
    delete props.id; // not allowed to set `id`
    const time = new Date().toISOString();

    return knex
      .update({ ...props, updated_at: time })
      .from(tableName)
      .where({ id })
      .returning(selectableProps)
      .timeout(timeout);
  };

  const destroy = (id) =>
    knex.del().from(tableName).where({ id }).timeout(timeout);

  return {
    name,
    tableName,
    selectableProps,
    timeout,
    create,
    findAll,
    findAllWith,
    find,
    findOne,
    findById,
    update,
    destroy,
  };
};
