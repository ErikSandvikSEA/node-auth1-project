const db = require('../database/connection') //db-config

module.exports = {
     add,
     find,
     findBy,
     findById
}

function find() {
     return db("users")
          .select(
               "id", 
               "username",
               'password', 
               'jobTitle_name',
               'jobTitle_id'
          )
          .orderBy("id");
   }
   
   function findBy(filter) {
     return db("users").where(filter).orderBy("id");
   }
   
   async function add(user) {
     try {
       const [id] = await db("users").insert(user, "id");
   
       return findById(id);
     } catch (error) {
       throw error;
     }
   }
   
   function findById(id) {
     return db("users").where({ id }).first();
   }
   