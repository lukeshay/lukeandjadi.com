exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('accounts')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        { email: 'shay.luke17@gmail.com', role: 'MASTER_ADMIN' },
        { email: 'contact@lukeandjadi.com', role: 'MASTER_ADMIN' },
        { email: 'luke@lukeandjadi.com', role: 'MASTER_ADMIN' },
        { email: 'jadireding@gmail.com', role: 'ADMIN' },
      ]);
    });
};
