exports.up = (knex) =>
  knex.schema.createTable('accounts', (table) => {
    table.increments('id');
    table.string('email').unique().index();
    table.string('first_name', 255).nullable();
    table.string('last_name', 255).nullable();
    table.integer('number_of_guests').nullable();
    table.boolean('reception').defaultTo(false);
    table.boolean('ceremony').defaultTo(false);
    table.string('role').defaultTo('basic');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('accounts');
