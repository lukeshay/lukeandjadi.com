exports.up = (knex) => knex.schema.dropTableIfExists('rsvps');

exports.down = (knex) =>
  knex.schema.createTable('rsvps', (table) => {
    table.increments('id');
    table.string('name', 255);
    table.string('email', 255).nullable();
    table.integer('guests').nullable();
  });
