exports.up = (knex) =>
  knex.schema.table('accounts', (table) => {
    table.renameColumn('ceremony', 'guests');
    table.dropColumn('reception');
  });

exports.down = (knex) =>
  knex.schema.table('accounts', (table) => {
    table.renameColumn('guests', 'ceremony');
    knex.integer('reception').nullable();
  });
