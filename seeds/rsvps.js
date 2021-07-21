exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('rsvps')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('rsvps').insert([{ name: 'Luke Shay', guests: 1 }]);
    });
};
