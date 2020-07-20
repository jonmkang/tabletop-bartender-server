function makeIngredientsArray() {
    return [
        {
            id: 1,
            title: 'Example 1',
            date_created: new Date().toISOString(),
        },
        {
            id: 2,
            title: 'Example 2',
            date_created: new Date().toISOString(),
        },
        {
            id: 3,
            title: 'Example 3',
            date_created: new Date().toISOString(),
        },
        {
            id: 4,
            title: 'Example 4',
            date_created: new Date().toISOString(),
        },
        {
            id: 5,
            title: 'Example 5',
            date_created: new Date().toISOString(),
        },
        {
            id: 6,
            title: 'Example 6',
            date_created: new Date().toISOString(),
        }
    ]
}
function makeCocktailsArray(ingredients) {
    return [
        {
            id: 1,
            title: 'Example 1',
            ingredient1: ingredients[0].id,
            ingredient2: ingredients[1].id,
            ingredient3: null,
            ingredient4: null,
            ingredient5: null,
            ingredient6: null,
            image: 'Example Link',
            recipe: 'Steps one two and three',
            date_created: new Date().toISOString(),
            flavor: null
        },
        {
            id: 2,
            title: 'Example 2',
            ingredient1: ingredients[4].id,
            ingredient2: ingredients[5].id,
            ingredient3: ingredients[2].id,
            ingredient4: ingredients[3].id,
            ingredient5: null,
            ingredient6: null,
            image: 'Example Link',
            recipe: 'Steps one two and three',
            date_created: new Date().toISOString(),
            flavor: null
        },
        {
            id: 3,
            title: 'Example 3',
            ingredient1: null,
            ingredient2: null,
            ingredient3: null,
            ingredient4: null,
            ingredient5: ingredients[4].id,
            ingredient6: ingredients[5].id,
            image: 'Example Link',
            recipe: 'Steps one two and three',
            date_created: new Date().toISOString(),
            flavor: null
        },
    ];
}

function makeCocktailsFixtures(){
    const testIngredients = makeIngredientsArray()
    const testCocktails = makeCocktailsArray(testIngredients)

    return { testIngredients, testCocktails }
}

function seedTables(db, ingredients, cocktails){
    return db.transaction( async trx => {
        await trx.into('ingredients').insert(ingredients)
        await trx.into('cocktails').insert(cocktails)
    })
        .catch()
}

function cleanTables(db){
    return db.raw(
        `TRUNCATE
            cocktails,
            ingredients,
            flavor_profile
            
            RESTART IDENTITY CASCADE;`
    )
}

module.exports = {
    makeCocktailsArray,
    makeIngredientsArray,
    makeCocktailsFixtures,
    cleanTables,
    seedTables
}
