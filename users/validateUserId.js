const Users = require('./usersModel')

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

 module.exports = validateUserId