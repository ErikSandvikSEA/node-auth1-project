const router = require('express').Router()
const Users = require('./usersModel')

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

module.exports = router