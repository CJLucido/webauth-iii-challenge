const router = require('express').Router();

const bcrypt = require('bcryptjs');

const Users = require('../04-api-users/users-model');



router.post('/', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);

    user.password = hash

    Users.add(user)
    .then(userInfo => {
        res.status(201).json({message: `Created user ${userInfo.username} with an id of ${userInfo.id}`})
    })
    .catch(err => {
        res.status(500).json({error: `Internal, faliure to create user, ${err}`})
    })
})

module.exports = router;

//we aren't authNing on registration, just hashing passwords