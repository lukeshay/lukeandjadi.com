-- migrate:up

insert into lukeandjadi_com.rsvps (id, name, guests, max_guests) VALUES ('0bb86412-30ba-422d-ac72-fb89e225352d', 'First & Second Family', 2, 6);

-- migrate:down

delete from lukeandjadi_com.rsvps where id = '0bb86412-30ba-422d-ac72-fb89e225352d';
