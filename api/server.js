const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session') //install this library
const KnexSessionStore = require('connect-session-knex')(session)


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
     })
}

server.get('/', (req, res) => {
     res.status(200).json({
          server: 'up'
     })
})

module.exports = server