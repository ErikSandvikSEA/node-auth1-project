const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session') //install this library
const KnexSessionStore = require('connect-session-knex')(session)

//routers
const usersRouter = require('../users/usersRouter')
const authRouter = require('../auth/authRouter')

//middleware
const requiresAuth = require('../auth/requiresAuth.js')

const dbConnection = require('../database/connection')

const server = express()

const sessionConfig = {
     name: 'cookie-from-sessionConfig',
     secret: process.env.SESSION_SECRET || 'Secret Message OOOOO',
     cookie: {
          maxAge: 600000, //10 mins in milliseconds
          secure: process.env.COOKIE_SECURE || false, //true means use only over https
          httpOnly: true, //js code on the client cannot access the session cookie
     },
     resave: false,
     saveUninitialized: true, //GDPR compliance
     store: new KnexSessionStore({
          knex: dbConnection,
          tablename: 'sessions',
          sidfieldname: 'sid',
          createtable: true,
          clearInterval: 6000, //delete expired sessions - in milliseconds
     })
}

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(session(sessionConfig))

server.use(
     '/api/users', 
     // requiresAuth, 
     usersRouter
)
server.use(
     '/api/auth',
     authRouter
)

server.get('/', (req, res) => {
     res.status(200).json({
          server: 'up'
     })
})

module.exports = server