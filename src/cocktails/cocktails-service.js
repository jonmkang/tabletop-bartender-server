const xss = require('xss')
const Treeize = require('treeize')

const CocktailsService = {
    getAllCocktails(db) {
        return db   
            .select('*')
            .from('cocktails')
    },
    insertCocktail(db, newBookmark){
        return db
            .insert(newCocktail)
            .into('cocktails')
            .returning('*')
            .then(rows=> {
                return rows[0]
            })
    }
}

module.exports = CocktailsService;