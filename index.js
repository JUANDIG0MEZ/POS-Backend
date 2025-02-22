const express = require('express')
const routerAPI = require('./src/rutas/index')
const cors = require('cors')

const app = express()
const port = 3000

app.use(cors())

app.get('/', (req, res)=>{
    res.send('Esta es la pagina principal')
})


routerAPI(app)

app.listen(port, ()=>{
    console.log(`Server running on port http:localhost:${port}`)
})