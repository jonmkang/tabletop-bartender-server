CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
)