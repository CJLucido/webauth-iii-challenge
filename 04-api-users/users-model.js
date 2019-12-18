const db = require('../data/db-config')


module.exports = {
    add,
    findUsers,
    findUsersBy
}

function add(userBody){
    return db('registeredUsers')
            .insert(userBody, 'id')
            .then(ids => {
                const [id] = ids;

                return findUsersBy({id})//this will also return the password property, would need a separate find by id method to avoid showing that
            })
}


function findUsers(){
    return db('registeredUsers')
            .select('id', 'username', 'department')
}

function findUsersBy(propertyValue){
    return db('registeredUsers')
            .select('id', 'username', 'password', 'department')
            .where(propertyValue)
            .first()
}

//ALTERNATE HELPER FUNCTION MODEL

// function find() {
//     return db('users').select('id', 'username');
//   }
  
//   function findBy(filter) {
//     return db('users')
//       .select('id', 'username', 'password') //make sure to return the hashed password
//       .where(filter);
//   }
  
//   function add(user) {
//     return db('users')
//       .insert(user, 'id')
//       .then(ids => {
//         const [id] = ids;
//         return findById(id);
//       });
//   }
  
//   function findById(id) {
//     return db('users')
//       .select('id', 'username')
//       .where({ id })
//       .first();
//   }
  