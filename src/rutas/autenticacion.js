const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/login', (req, res) => {
    usuario_id: 
    const token = jwt.sign({usuario_id: 23})
})

router.post('/register', (req, res) => {

})

router.post('/logout', (req, res) => {

})

module.exports = router
