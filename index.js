require('dotenv').config()

const express = require('express')
const routerAPI = require('./src/rutas/index')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { handlerError } = require('./src/middlewares/errorHandler')
const app = express()

const port = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173', // Cambia esto por el origen real de tu frontend
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Esta es la pagina principal')
})

routerAPI(app)

app.use(handlerError)

app.listen(port, () => {
  console.log(`Server running on port http:localhost:${port}`)
})
