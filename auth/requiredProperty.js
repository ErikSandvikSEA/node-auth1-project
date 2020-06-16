function requiredProperty(property){
     return (req, res, next) => {
       if(!req.body[property]){
         res.status(400).json({
           message: `Needs to include a required ${property} property`
         })
       } else {
       next()
       }
     }
}

module.exports = {
     requiredProperty
}