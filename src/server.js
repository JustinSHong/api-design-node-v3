import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

// middleware to transform request
app.use(cors()) // enables CORS for server - allow interactions among domains
app.use(json()) // returns data as JS object
app.use(urlencoded({ extended: true })) // attach params to a url
app.use(morgan('dev')) // logging functionality

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

app.get('/data', (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
