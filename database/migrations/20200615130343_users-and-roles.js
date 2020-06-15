
exports.up = function(knex) {
  return knex.schema
     .createTable('jobTitle', tbl => {
          tbl.increments()
          tbl.string('name', 128).notNullable().unique()
     })
     .createTable('users', tbl => {
          tbl.increments()
          tbl.string('username', 128).notNullable().unique().index();
          tbl.string('password', 256).notNullable()
          tbl
               .integer('jobTitle_id')
               .unsigned()
               .references('jobTitle.id')
               .onDelete('RESTRICT')
               .onUpdate('CASCADE')
          tbl
               .string('jobTitle_name')
               .notNullable()
               .references('jobTitle.name')
               .onDelete('RESTRICT')
               .onUpdate('CASCADE')
     })
};

exports.down = function(knex) {
  return knex.schema
     .dropTableIfExists('jobTitle')
     .dropTableIfExists('users') 
};
