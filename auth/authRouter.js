const bc = require('bcryptjs')
const router = require('express').Router()

const Users = require('../users/usersModel')
const { requiredProperty } = require('./requiredProperty')

//REGISTRATION
router.post(
     '/register', 
     requiredProperty('username'),
     requiredProperty('password'),
     requiredProperty('jobTitle_name'),
     requiredProperty('jobTitle_id'),
     (req, res) => {
     //validate to make sure username and password exist
     const { 
          username, 
          password, 
          jobTitle_name, 
          jobTitle_id 
     } = req.body

     //hash user password
     const rounds = process.env.HASH_ROUNDS || 10
     const hash = bc.hashSync(password, rounds)

     Users.add({
          username,
          password: hash,
          jobTitle_name,
          jobTitle_id
     })
          .then(user => {
               res.status(201).json({
                    message: 'Succesfully Registered!',
                    user
               })
          })
          .catch(err => {
               console.log(err)
               res.status(500).json({
                    message: 'Error occurred during posting',
                    error: err
               })
          })
})

//LOGIN
router.post(
     '/login',
     requiredProperty('username'),
     requiredProperty('password'), 
     (req, res) => {
          //validate the body, to make sure there are both username and password
          const { username, password } = req.body

          //verify user password
          Users.findBy({ username })
               .then(([user]) => {
                    if(user && bc.compareSync(password, user.password)) {
                         req.session.user = {
                              id: user.id,
                              username: user.username
                         }
                         res.status(201).json({
                              message: `Welcome ${user.username}!`,
                              session: req.session,
                         })
                    } else {
                         res.status(401).json({
                              message: 'Username or password incorrect'
                         })
                    }
               })
               .catch(err => {
                    res.status(500).json({
                         message: 'Error occurred while logging in',
                         error: err
                    })
               })
})

//LOGOUT
router.get('/logout', (req, res) => {
     if(req.session) {
          req.session.destroy(error => {
               if(error){
                    res.status(500).json({
                         message: 'Error occurred while logging out',
                         error: error
                    })
               } else {
                    res.status(204).json({
                         message: 'Successfully Logged Out'
                    }).end()
               }
          })
     } else {
          res.status(204).json({
               message: 'Successfully Logged Out'
          }).end()
     }
})

module.exports = router

