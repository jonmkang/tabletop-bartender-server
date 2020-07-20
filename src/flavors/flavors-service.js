const xss = require('xss')
const Treeize = require('treeize')

const FlavorsService = {
    getAllFlavors(db) {
        return db   
            .select('*')
            .from('flavor_profile')
    }
}

module.exports = FlavorsService;