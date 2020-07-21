const express = require('express')
const path = require('path')
const CocktailsService = require('./cocktails-service')
const cocktailsRouter = express.Router()
const app = require('../app')
const bodyParser = express.json();
const xss = require('xss')


cocktailsRouter 
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db')
        CocktailsService.getAllCocktails(db)
            .then(cocktails => {
                res.json(cocktails)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res) => {
        const db = req.app.get('db')
        const { title, ingredients, recipe, image, flavor } = req.body;
        const cocktailToAdd = { title: ''};
        for(let i = 1; i <= ingredients.length; i++){
            cocktailToAdd[`ingredient${i}`] = ingredients[i-1]
        }

        cocktailToAdd.title = xss(title);
        cocktailToAdd.recipe = xss(recipe);
        cocktailToAdd.image = xss(image);
        cocktailToAdd.flavor = flavor;

        return res.status(201)
    })

module.exports = cocktailsRouter;