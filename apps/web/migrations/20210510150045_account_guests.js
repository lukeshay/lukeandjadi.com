exports.up = (knex) =>
  knex.schema.table('accounts', (table) => {
    table.dropColumn('reception');
    table.dropColumn('ceremony');
  });

exports.down = (knex) =>
  knex.schema.table('accounts', (table) => {
    table.boolean('reception').defaultTo(false);
    table.boolean('ceremony').defaultTo(false);
  });
