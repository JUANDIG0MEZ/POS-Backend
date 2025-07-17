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
const DOMAIN = process.env.DOMAIN

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use(vhost(`auth.${DOMAIN}`, authApp))
app.use(vhost(`api.${DOMAIN}`, apiApp))

app.use(handlerError)

app.listen(PORT, () => {
  console.log(`Server running on port http:localhost:${PORT}`)
  console.log(`Auth: http://auth.${DOMAIN}:${PORT}`)
  console.log(`API: http://api.${DOMAIN}:${PORT}`)
})
