exports.up = (knex) => knex.raw('create extension if not exists "uuid-ossp"');

exports.down = () => null;
