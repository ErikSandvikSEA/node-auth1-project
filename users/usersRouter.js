const router = require('express').Router()
const Users = require('./usersModel')
// const { validateUserId } = require('./validateUserId')

//GETs
router.get('/', (req, res) => {
     Users.find()
          .then(usersList => {
               res.status(200).json({
                    message: 'Successfully Fetched Users',
                    users: usersList
               })
          })
          .catch(err => {
               res.send(err)
               res.status(500).json({
                    message: 'Error occurred while fetching',
                    error: err
               })
          })
})

router.get(
     '/:id', 
     validateUserId,
     (req, res) => {
     const user = req.user
     res.status(200).json({
          userDetails: user
     })
})

function validateUserId(req, res, next) {
     const userId = req.params.id
     Users.findById(userId)
       .then(user => {
         if(user) {
           req.user = user
           next()
         } else {
           res.status(404).json({ message: 'User not found, sry' })
         }
       })
       .catch(err => {
         console.log(error)
         res.status(500).json({
           message: 'Error retrieving the user'
         })
       })
 }

module.exports = router