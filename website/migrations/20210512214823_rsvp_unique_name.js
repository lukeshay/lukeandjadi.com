exports.up = (knex) =>
  knex.schema.alterTable('rsvps', (table) => {
    table.unique('name');
    table.index('name');
  });

exports.down = (knex) =>
  knex.schema.alterTable('rsvps', (table) => {
    table.dropUnique('name');
    table.dropIndex('name');
  });
