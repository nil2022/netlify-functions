const jwt = require('jsonwebtoken')

/* -------- CHECK IF TOKEN IS PROVIDED & VERIFY TOKEN ----------- */
const verifyToken = (req, res, next) => {
    const token = req.headers['token']
  
    if (!token) {
      return res.status(403).send({
        message: 'No token provided!'
      })
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log('Error with JWT -', err.message)
        return res.status(401).send({
          message: 'Unauthorized!'
        })
      }
      req.userId = decoded.userId
      next()
    })
  }

module.exports = {
    verifyToken
}