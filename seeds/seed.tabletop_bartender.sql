BEGIN;

TRUNCATE
    ingredients,
    cocktails,
    flavor_profile
    RESTART IDENTITY CASCADE;

INSERT INTO ingredients(title)
VALUES
    ('Vodka'), 
    ('Tequila'), 
    ('Rum'), 
    ('Whiskey'), 
    ('Gin'), 
    ('Orange Juice'), 
    ('Lime Juice'), 
    ('Simple Syrup'), 
    ('Agave'), 
    ('Cherry'), 
    ('Orange Slice'),
    ('Angostura Bitters');

INSERT INTO flavor_profile(title)
VALUES
    ('Citrus'),
    ('Peaty'),
    ('Sweet'),
    ('Bitter'),
    ('Floral');


INSERT INTO cocktails(title, ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6, image, recipe, flavor)
VALUES
    ('Screwdriver', 1, 6, null, null, null, null, 'https://www.liquor.com/thmb/tRRgfgO8S4UqgYPpnfdzE8Lc3cs=/720x720/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__liquor__2017__11__06162348__screwdrvier-720x720-recipe-23e0c0ac47334f108e4fa00b34b7f5bf.jpg', 'Mix 2oz Vodka and 4oz Orange Juice in a highball glass.  Fill with ice and stir. Garnish with orange slice.', 3),
    ('Margarita', 2, 7, 8, null, null, null, 'https://www.liquor.com/thmb/_s0rIPz2kRVAqNmdDQdJAtu2Wws=/735x0/__opt__aboutcom__coeus__resources__content_migration__liquor__2018__04__23134943__Margarita-720x720-recipe-v2-6dc3213825c94a9cb6d7ce1818ce6e31.jpg', 'Shake 2oz Tequila, 1oz Lime Juice, .75oz Agave Syrup with ice.  Strain into a rocks glass with ice.  Garnish with lime.  Salt rim is optional', 1),
    ('Old Fashioned', 4, 8, 10, 11, 12, null, 'https://res.cloudinary.com/hjqklbxsu/image/upload/f_auto,fl_lossy,q_auto/v1536678158/social-share/JD_OldFashioned_AllPurpose_DigitalRecipePost.jpg', 'Muddle cherry, orange slice, 2 dashes of Angostura bitters and 1 tsp of Simple Syrup in a rocks glass.  Add 2oz of whiskey. Stir until chilled.', 2);

COMMIT;