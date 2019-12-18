const jwt = require('jsonwebtoken')

module.exports = {
  restrictedAuthZ,
  checkDepartment
} 



const restrictedAuthZ = (req, res, next) => {
  const {token} = req.headers;

  const secret = process.env.JWT_SECRET
  
      if (token) {
        jwt.verify(token, secret, function(err, decoded) {
          if(err){
            res.status(401).json({message: "invalid token"})
          } else{
            req.token = decoded

            next();
          } 
              })
    
      } else {
        res.status(401).json({ message: 'You Shall Not Pass' });
      }
    };
    
  function checkDepartment(department){
    return function(req, res, next){
      if (req.token && department === req.token.department){
        next()
      }else{
        res.status(403).json({message: `No access for ${req.token.department} department`})
      }
    }
  }