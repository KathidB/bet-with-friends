Create table system_info(
    id serial primary key,
    uuid varchar,
    profile_id integer,
    message_value TEXT,
    was_read boolean default false
)