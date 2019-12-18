
exports.up = function(knex) {
  return knex.schema.createTable('registeredUsers', tbl =>{

    tbl.increments();

    tbl.string('username', 108)
        .notNullable()
        .unique()

    tbl.string('password', 108)
        .notNullable()
        
        

  })
};

exports.down = function(knex) { //why does he put Promise in the parameters?
  return knex.schema.dropTableIfExists('registeredUsers')
};
