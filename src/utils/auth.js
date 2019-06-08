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
  // accept email and pw for a user
  // return a new JWT
}

export const signin = async (req, res) => {
  // check validity of email and pw for a user - see user.checkPassword
  // return a new JWT
}

// AUTH MIDDLEWARE
export const protect = async (req, res, next) => {
  // protect all mounted routes - look for JWT in auth header in every req
  // see verifyToken() controller
  next()
}
