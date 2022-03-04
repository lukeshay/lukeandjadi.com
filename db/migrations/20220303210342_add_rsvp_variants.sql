-- migrate:up
create table lukeandjadi_com.rsvp_variants (
  id uuid primary key not null,
  rsvp_id uuid not null,
  variant character varying(127) not null,
  constraint fk_variant_rsvp foreign key(rsvp_id) references lukeandjadi_com.rsvps(id) on delete cascade
);

create index idx_rsvp_variants_rsvp_id on lukeandjadi_com.rsvp_variants(rsvp_id);
create unique index idx_rsvp_variants_variant on lukeandjadi_com.rsvp_variants(variant);

grant select, insert, update on table lukeandjadi_com.rsvp_variants to lukeandjadi_com;

-- migrate:down

drop index if exists idx_rsvp_variants_rsvp_id cascade;
drop index if exists idx_rsvp_variants_variant cascade;
drop table if exists lukeandjadi_com.rsvp_variants cascade;
