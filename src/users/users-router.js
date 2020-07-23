const express = require('express')
const { comparePasswords } = require('../auth/auth-service')
const UsersService = require('./users-service')
const path = require('path')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, user_email, first_name } = req.body;

        for(const field of ['first_name', 'user_email', 'password'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}'`
                })

        const emailError = UsersService.validateEmail(user_email)
        if(emailError)
            return res.status(400).json({
                error: emailError
            })

        const passwordError = UsersService.validatePassword(password)
        if(passwordError)
            return res.status(400).json({
                error: passwordError
            })

        UsersService.hasUserWithUserName(
            req.app.get('db'),
            user_email
        )
            .then(hasUserNameWithUserName => {
                if(hasUserNameWithUserName)
                    return res.status(400).json({ error: `User email has registered already` })
            
                    return UsersService.hashPassword(password)
                        .then(hashedPassword => {
                            const newUser = {
                                user_email,
                                password: hashedPassword,
                                first_name,
                                date_created: 'now()',
                            }
            

                    return UsersService.insertUser(
                        req.app.get('db'),
                        newUser,
                    )
                        .then(user => {
                            res
                                .status(201)
                                .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                .json(UsersService.serializeUser(user))
                        })
            })
            .catch(next)
        })
    })
module.exports = usersRouter