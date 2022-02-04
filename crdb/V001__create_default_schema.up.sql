create role lukeandjadi_com with login password ${DB_PASS} nocreatedb nocreaterole;

create schema lukeandjadi_com;

alter role lukeandjadi_com set search_path = lukeandjadi_com;

grant usage on schema lukeandjadi_com to lukeandjadi_com;

create table lukeandjadi_com.rsvps (
  id uuid primary key not null,
  email character varying(63),
  name character varying(63) not null,
  guests smallint not null default 2,
  max_guests smallint not null default 2,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone not null default now(),
  user_agent character varying(127)
);

create unique index idx_rsvps_name on lukeandjadi_com.rsvps(name);

grant select, insert, update on table lukeandjadi_com.rsvps to lukeandjadi_com;

create table lukeandjadi_com.cdcs (
  id uuid primary key not null,
  resource character varying(63) not null,
  resource_id uuid not null,
  current_value jsonb,
  previous_value jsonb,
  delta jsonb,
  created_at timestamp with time zone default now()
);

create index idx_cdcs_resource_resource_id on lukeandjadi_com.cdcs(resource, resource_id);

grant select, insert on table lukeandjadi_com.cdcs to lukeandjadi_com;

insert into lukeandjadi_com.rsvps (id, name, guests, max_guests) VALUES ('f91e2ab8-f923-4058-b1ac-777e6440787f', 'Luke Shay', 2, 2);
