exports.up = (knex) =>
  knex.schema.createTable('rsvps', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.string('name', 255);
    table.string('email', 255).nullable();
    table.integer('guests').nullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('rsvps');
