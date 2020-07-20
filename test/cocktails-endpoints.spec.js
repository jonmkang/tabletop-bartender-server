require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { contentSecurityPolicy } = require('helmet')
const supertest = require('supertest')
const helpers = require('./test-helpers')

describe('Cocktails Endpoints', function() {
    let db;

    const {
        testIngredients,
        testCocktails,
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

    describe.only(`GET /cocktails`, () => {
        context('Given there are cocktails in the database', () => {
            

            beforeEach('insert cocktails', () => {
                helpers.seedTables(
                    db,
                    testIngredients,
                    testCocktails
                )
            })

            it('GET /cocktails responds with 200 and all of the cocktails', () => {
                return supertest(app)
                    .get('/api/cocktails')
                    .expect(200, testCocktails)
            })
        })
    })
})