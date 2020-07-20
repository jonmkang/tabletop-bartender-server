CREATE TABLE cocktails (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    date_created TIMESTAMPTZ DEFAULT now() NOT NULL,
    ingredient1 INTEGER 
        REFERENCES ingredients(id) MATCH SIMPLE,
    ingredient2 INTEGER 
        REFERENCES ingredients(id) MATCH SIMPLE,
    ingredient3 INTEGER 
        REFERENCES ingredients(id) MATCH SIMPLE,
    ingredient4 INTEGER 
        REFERENCES ingredients(id) MATCH SIMPLE,
    ingredient5 INTEGER 
        REFERENCES ingredients(id) MATCH SIMPLE,
    ingredient6 INTEGER 
        REFERENCES ingredients(id) MATCH SIMPLE,
    image TEXT,
    recipe TEXT NOT NULL
)