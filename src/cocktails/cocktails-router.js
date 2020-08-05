const express = require('express')
const path = require('path')
const CocktailsService = require('./cocktails-service')
const cocktailsRouter = express.Router()
const app = require('../app')
const { requireAuth } = require('../middleware/jwt-auth')
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
        if(!requireAuth){
            return
        }
        const db = req.app.get('db')
        const { title, ingredients, recipe, image, flavor, user_id } = req.body;
        const cocktailToAdd = { title: ''};
        for(let i = 1; i <= ingredients.length; i++){
            cocktailToAdd[`ingredient${i}`] = ingredients[i-1]
        }

        cocktailToAdd.title = xss(title);
        cocktailToAdd.recipe = xss(recipe);
        cocktailToAdd.image = xss(image);
        cocktailToAdd.flavor = flavor;
        cocktailToAdd.user_id = parseInt(user_id);

        CocktailsService.insertCocktail(
            db,
            cocktailToAdd
        )
            .then(cocktail => {
                res
                    .status(201)
                    .json(CocktailsService.serializeCocktail(cocktail))
            })
        return res.status(201)
    })
    .patch(bodyParser, (req, res, next) => {
        const db = req.app.get('db')
        const { id, title, ingredients, recipe, image, flavor, user_id } = req.body;
        const cocktailToAdd = { title: ''};
        for(let i = 1; i <= ingredients.length; i++){
            cocktailToAdd[`ingredient${i}`] = ingredients[i-1]
        }
        
        cocktailToAdd.title = xss(title);
        cocktailToAdd.recipe = xss(recipe);
        cocktailToAdd.image = xss(image);
        cocktailToAdd.flavor = flavor;
        cocktailToAdd.user_id = parseInt(user_id);

        CocktailsService.updateCocktail(
            db,
            id,
            cocktailToAdd
        )
            .then(cocktail => {
                res
                    .status(204)
                    .json(CocktailsService.serializeCocktail(cocktail))
            })
            .catch(next)
    })

module.exports = cocktailsRouter;