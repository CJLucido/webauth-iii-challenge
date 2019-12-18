// GET users /api/users

const router = require('express').Router();

const bcrypt = require('bcryptjs')

const Users = require('./users-model')


//MIDDLEWARE
const restricted = require('../03-api-auth/restricted-middleware')

//Users.findUsers().then(res=> console.log(res))

router.get('/', restricted, (req, res)=>{//don't forget that you've already stated that this is on the /users/ URL on api-router.js!!!
    Users.findUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({error: `Internal, failed to retrieve users. ${err}`})
    })
})



module.exports = router;