
const jwt = require('jsonwebtoken')


module.exports ={
    signToken
};


function signToken(user){
    const payload = {
        id: user.id,
      username:user.username,
      department:user.department //this will come from the database
    };
    
    const secret = process.env.JWT_SECRET;
    
    const options = {
      expiresIn: '1h',
    
    };
    
      return jwt.sign(payload, secret, options)
    };