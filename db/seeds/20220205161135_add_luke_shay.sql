-- migrate:up

insert into lukeandjadi_com.rsvps (id, name, guests, max_guests) VALUES ('f91e2ab8-f923-4058-b1ac-777e6440787f', 'Luke Shay', 2, 2);

-- migrate:down

delete from lukeandjadi_com.rsvps where id = 'f91e2ab8-f923-4058-b1ac-777e6440787f';
