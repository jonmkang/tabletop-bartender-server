require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { contentSecurityPolicy } = require('helmet')
const supertest = require('supertest')
const helpers = require('./test-helpers')

describe('Ingredients Endpoints', function() {
    let db;

    const {
        testIngredients,
    } = helpers.makeCocktailsFixtures()

    before(`make knex instance`, () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    before('clean the table', () => helpers.cleanTables(db));

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => helpers.cleanTables(db));

    describe(`GET /ingredients`, () => {
        context('Given there are no ingredients in the database', () => {
            it('responds with 200 and an empty list', () => {
                return supertest(app)
                    .get('/api/ingredients')
                    .expect(200, [])
            })
        })

        context('Given there are ingredients in the database', () => {
            beforeEach('insert ingredients', () => {
                return db
                    .into('ingredients')
                    .insert(testIngredients)
            })

            it('GET /ingredients responds with 200 and all of the ingredients', () => {
                return supertest(app)
                    .get('/api/ingredients')
                    .expect(200, testingredients) 
            })
        })
    })
})