require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const e = require('express')
const cocktailsRouter = require('./cocktails/cocktails-router')
const CocktailService = require('./cocktails/cocktails-service')
const IngredientsService = require('./ingredients/ingredients-service')
const ingredientsRouter = require('./ingredients/ingredients-router')
const flavorsRouter = require('./flavors/flavors-router')
const FlavorsService = require('./flavors/flavors-service')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use('/api/cocktails', cocktailsRouter)
app.use('/api/ingredients', ingredientsRouter)
app.use('/api/flavors', flavorsRouter)

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production'){
        response = { error: {message: 'server error'}}
    }else {
        console.error(error)
        response = { message: error.message, error}
    }
    res.status(500).json(response)
})

module.exports = app