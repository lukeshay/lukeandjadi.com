exports.up = (knex) =>
  knex.schema
    .table('accounts', (table) => {
      table.dropColumns(['guests', 'first_name', 'last_name']);
    });

exports.down = (knex) => knex.schema.table('accounts', (table) => {
  table.integer('guests').nullable();
  table.string('first_name', 255).nullable();
  table.string('last_name', 255).nullable();
});
