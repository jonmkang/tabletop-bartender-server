const xss = require('xss')
const Treeize = require('treeize')

const CocktailsService = {
    getAllCocktails(db) {
        return db   
            .select('*')
            .from('cocktails')
    },
    insertCocktail(db, newCocktail){
        return db
            .insert(newCocktail)
            .into('cocktails')
            .returning('*')
            .then(rows=> {
                return rows[0]
            })
    },
    serializeCocktail(cocktail){
        return {
            id: cocktail.id,
            title: cocktail.title,
            recipe: cocktail.recipe,
            image: cocktail.image,
            ingredient1: cocktail.ingredient1,
            ingredient2: cocktail.ingredient2,
            ingredient3: cocktail.ingredient3,
            ingredient4: cocktail.ingredient4,
            ingredient5: cocktail.ingredient5,
            ingredient6: cocktail.ingredient6,
            flavor: cocktail.flavor,
            user_id: cocktail.user_id
        }
    },
    updateCocktail(db, id, newCocktailFields){
        return db('cocktails')
            .where({ id })
            .update(newCocktailFields)
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    }
}

module.exports = CocktailsService;