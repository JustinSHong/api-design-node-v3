import express from 'express'
import { Router } from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

const router = Router()

router.get('/me', (req, res) => {
  res.send({ message: 'this is the me sub-route' })
})

app.use('/api', router)

const routes = [
  'get /cat',
  'get /cat/:id',
  'post /cat',
  'put /cat/:id',
  'delete /cat/:id'
]

router
  .route('/cat')
  .get()
  .post()

router
  .route('/cat/:id')
  .get()
  .put()
  .delete()

const log = (req, res, next) => {
  console.log('logging')
  req.logData = 'this is a log'
  next() // accepts an argument that is an error object
}
app.disable('x-powered-by')

// middleware to transform request
app.use(cors()) // enables CORS for server - allow interactions among domains
app.use(json()) // returns data as JS object
app.use(urlencoded({ extended: true })) // attach params to a url
app.use(morgan('dev')) // logging functionality
app.use(log)

app.get('/', (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.get('/helloWorld', (req, res) => {
  res.send({ message: 'the world says hello friend' })
})

// run log middleware for /data route
app.get('/data', log, (req, res) => {
  //   res.send({ message: 'hello' })
  res.send({ message: req.logData })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
