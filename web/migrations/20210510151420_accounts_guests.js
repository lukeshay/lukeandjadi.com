exports.up = (knex) =>
  knex.schema.table('accounts', (table) => {
    table.renameColumn('number_of_guests', 'ceremony');
    table.integer('reception').nullable();
  });

exports.down = (knex) =>
  knex.schema.table('accounts', (table) => {
    table.dropColumn('reception');
    table.renameColumn('ceremoy', 'number_of_guests');
  });
