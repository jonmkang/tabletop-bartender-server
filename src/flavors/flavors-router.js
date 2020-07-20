const express = require('express')
const path = require('path')
const FlavorsService = require('./flavors-service')
const flavorsRouter = express.Router()
const app = require('../app')

flavorsRouter 
    .route('/')
    .get((req, res, next) => {
        const db = req.app.get('db')
        FlavorsService.getAllFlavors(db)
            .then(flavors => {
                res.json(flavors)
            })
            .catch(next)
})

module.exports = flavorsRouter;