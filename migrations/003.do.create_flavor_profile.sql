CREATE TABLE flavor_profile (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date_create TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE cocktails
    ADD COLUMN flavor INTEGER REFERENCES flavor_profile(id) ON DELETE SET NULL;