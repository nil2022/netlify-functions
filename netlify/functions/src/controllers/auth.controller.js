const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const authConfig = require('../configs/auth.config')

/* -------- SIGNUP API----------- */
exports.signup = async (req, res) => {

    const { username, userId, password, email, } = req.body;

    const salt = await bcrypt.genSalt(10) // Salt generate to Hash Password

    const userObj = {
       username: username,
       userId: userId,
       password: bcrypt.hashSync(password, salt),
       email: email
    }

    try {
        const userCreated = await User.create(userObj)
        const postResponse = {
            name: userCreated.username,
            userId: userCreated.userId,
            email: userCreated.email,
            createdAt: userCreated.createdAt
        }
        console.log({
            Message: 'User Created Successfully',
            Response: postResponse
          })
        res.status(201).send({
            Message: 'User Registered Success',
            UserData: postResponse
          })
    } catch (error) {
        console.log('Something went wrong while saving to DB', `${error.name}:${error.message}`)
        res.status(500).send({
        message: 'Some internal error while inserting the element'
    })
    }
}

/* -------- SIGNIN API----------- */
exports.signin = async (req, res) => {
    const user = await User.findOne({ userId: req.body.userId })
    console.log('Signin Request for ', user)
  
    if (!user) {
      res.status(400).send("Failed! UserId doesn't exist!")
      return
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    )
  
    if (!passwordIsValid) {
      console.log('Invalid Password!')
      res.status(401).send('Invalid Password!')
      return
    }
    const token = jwt.sign({ userId: user.userId }, authConfig.secretKey, {
      expiresIn: '7d' // 7 Days
    })
  
    const signInResponse = {
      name: user.username,
      userId: user.userId,
      email: user.email,
      accessToken: token
    }
    res.status(201).send({
      message: 'Signed in successfully!',
      Response: signInResponse
    })
  }

