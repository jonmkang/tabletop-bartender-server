const express = require('express')
const path = require('path')
const IngredientsService = require('./ingredients-service')
const ingredientsRouter = express.Router()
const app = require('../app')

ingredientsRouter 
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db')
        IngredientsService.getAllIngredients(db)
            .then(ingredients => {
                res.json(ingredients)
            })
            .catch(next)
})

module.exports = ingredientsRouter;