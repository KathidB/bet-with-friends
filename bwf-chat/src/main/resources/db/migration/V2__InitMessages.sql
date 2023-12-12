Create TABLE messages(
    id serial primary key,
    uuid varchar not null,
    sender int REFERENCES profiles(id),
    reaction TEXT,
    content_message TEXT
);