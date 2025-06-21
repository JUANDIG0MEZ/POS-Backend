const express = require('express')
const routerAPI = require('./src/rutas/index')
const cors = require('cors')
const { handlerError } = require('./src/middlewares/errorHandler')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Esta es la pagina principal')
})

routerAPI(app)

app.use(handlerError)

app.listen(port, () => {
  console.log(`Server running on port http:localhost:${port}`)
})
