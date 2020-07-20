const xss = require('xss')
const Treeize = require('treeize')

const IngredientsService = {
    getAllIngredients(db) {
        return db   
            .select('*')
            .from('ingredients')
    }
}

module.exports = IngredientsService;