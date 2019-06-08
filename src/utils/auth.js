import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

// create a new JWT based on user id given a user obj
export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

// verify token was made with same secret from same server given a user obj
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

// AUTH CONTROLLERS
export const signup = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).send({ message: 'invalid credentials' })

  try {
    const user = await User.create({ email, password })
    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
}

export const signin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.status(400).send({ message: 'invalid credentials' })

  const user = await User.findOne({ email }).exec()

  if (!user) return res.status(401).send({ message: 'invalid email' })

  try {
    const match = await user.checkPassword(password)
    if (!match) return res.status(401).send({ message: 'invalid password' })

    const token = newToken(user)
    return res.status(201).send({ token })
  } catch (err) {
    console.error(err)
    return res.status(500).end()
  }
}

// AUTH MIDDLEWARE
export const protect = async (req, res, next) => {
  // protect all mounted routes - look for JWT in auth header in every req
  // see verifyToken() controller
  next()
}
