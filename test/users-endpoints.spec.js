require('dotenv').config()
const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')
const { contentSecurityPolicy } = require('helmet')
const supertest = require('supertest')
const helpers = require('./test-helpers')

describe('Users Endpoints', function() {
    let db

    const testUsers = helpers.makeUsersArray()
    const testUser = testUsers[0]

    before('make knex instance', () => {
        db = knex({ 
            client: 'pg', 
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })


    before('clean the table', () => helpers.cleanTables(db));

    after('disconnect from db', () => db.destroy());

    afterEach('cleanup', () => helpers.cleanTables(db));

    describe(`POST /api/users`, () => {
        context(`User Validation`, () => {
            beforeEach('insert users', () => 
                helpers.seedUsers(
                    db, 
                    testUsers,
                )
            )

            const requiredFields = ['first_name', 'user_email', 'password']

            requiredFields.forEach(field => {
                const registerAttemptBody = {
                first_name: 'test name',
                user_email: 'test@gmail.com',
                password: 'test password',
                }

                it(`responds with 400 required error when '${field}' is missing`, () => {
                delete registerAttemptBody[field]

                return supertest(app)
                    .post('/api/users')
                    .send(registerAttemptBody)
                    .expect(400, {
                    error: `Missing '${field}'`,
                    })
                })
            })

            it(`responds with 400 error when User exists`, () => {
                const newUser = {
                    user_email: 'user1@gmail.com',
                    first_name: 'User Three',
                    password: 'Abcd1234!'
                }

                return supertest(app)
                    .post('/api/users')
                    .send(newUser)
                    .expect(400, {
                        error: `User email has registered already`
                    })
            })

            const passwordConstraints = [
                'abcd1234!', 'Abcd1234', 'Abcd!@#$'
            ]

            passwordConstraints.forEach(password => {
                const newUser = {
                    user_email: 'user4@gmail.com',
                    first_name: 'User Four',
                    password: password
                }

                it(`responds with error when password does not fufill requirements`, () => {
                

                    return supertest(app)
                        .post('/api/users')
                        .send(newUser)
                        .expect(400, {
                            error: `Password must contain 1 upper case, lower case, number and special character`
                        })
                })
            })   
        })
    })
})