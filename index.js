require('dotenv').config()
const express = require('express')
const vhost = require('vhost')

const authApp = require('./src/authApp/v1')
const apiApp = require('./src/apiApp/v1')

const cookieParser = require('cookie-parser')
const cors = require('cors')
const { handlerError } = require('./src/middlewares/errorHandler')
const app = express()

const PORT = process.env.PORT

const URL_AUTH = process.env.URL_AUTH
const URL_FRONTEND = process.env.URL_FRONTEND
const DOMAIN_AUTH = process.env.DOMAIN_AUTH
const DOMAIN_API = process.env.DOMAIN_API

const whitelist = [URL_FRONTEND, URL_AUTH]

const corsOptions = {
  origin: (origin, callback) => {
    console.log('origin: ', origin)
    if (!origin) return callback(null, true)
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use(vhost(`${DOMAIN_AUTH}`, authApp))
app.use(vhost(`${DOMAIN_API}`, apiApp))

app.use(handlerError)

app.listen(PORT, () => {
  console.log(`Server running on port http:localhost:${PORT}`)
  console.log(`Auth: ${process.env.URL_AUTH}`)
  console.log(`API: ${process.env.URL_API}`)
})
