const express = require('express')
const path = require('path')
const IngredientsService = require('./ingredients-service')
const ingredientsRouter = express.Router()
const app = require('../app')
const bodyParser = express.json();

ingredientsRouter 
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db')
        IngredientsService.getAllIngredients(db)
            .then(ingredients => {
                res.json(ingredients)
            })
            .catch(next)
    // .post(bodyParser, (req, res) => {
    //     const db = req.app.get('db')
    //     const { title } = req.body;


    // })
})

module.exports = ingredientsRouter;