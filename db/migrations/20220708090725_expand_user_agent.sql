-- migrate:up
ALTER TABLE lukeandjadi_com.rsvps ALTER COLUMN user_agent TYPE varchar(256);

-- migrate:down

ALTER TABLE lukeandjadi_com.rsvps ALTER COLUMN user_agent TYPE varchar(127);
