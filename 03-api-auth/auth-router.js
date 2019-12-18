//login /api/login

const router = require('express').Router();

const bcrypt = require('bcryptjs')

const Users = require('../04-api-users/users-model')


//Users.findUsersBy({username: "wow", password: "nope"}).then(res=> console.log(res))

router.post('/', (req,res)=>{ //don't forget that you've already stated that this is on the /login/ URL on api-router.js!!!
    let {username, password} = req.body;

   // console.log('cookies:', req.cookies)

    Users.findUsersBy({username})
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                
                res.cookie('user_id', user.id, { maxAge: 900000, httpOnly: true }) ;
                res.status(200).json({message: `Logged in, user id: ${user.id}`})
            }else{
                res.status(401).json({message: 'You shall not pass!'})
            }
        })
        .catch(err => {
            res.status(500).json({error: `Internal error: ${err}`})
        });
})

module.exports = router;