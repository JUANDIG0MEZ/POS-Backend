const express = require('express')
const registerRouter = require('./register.js')
const confirmRouter = require('./confirm.js')
const logoutRouter = require('./logout.js')
const loginRouter = require('./login.js')
const path = require('path')

const authApp = express()

// Middlewares

const router = express.Router()

router.use('/register',
  express.static(path.join(__dirname, 'public', 'register')))

router.use('/login',
  express.static(path.join(__dirname, 'public', 'login')))

router.use('/confirm',
  express.static(path.join(__dirname, 'public', 'confirm')))

router.post('/register', registerRouter)
router.post('/login', loginRouter)
router.post('/confirm', confirmRouter)
router.post('/logout', logoutRouter)

authApp.use(router)

module.exports = authApp
