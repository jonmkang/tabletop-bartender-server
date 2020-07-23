CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    first_name TEXT NOT NULL,
    password TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);