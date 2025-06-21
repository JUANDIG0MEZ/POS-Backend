const express = require('express')
const multer = require('multer')

const { v4: uuidv4 } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname).toLowerCase()
    const nombreUnico = uuidv4()
    const nombreCompleto = nombreUnico + extension
    cb(null, nombreCompleto)
  }
})

const router = express.Router()

const upload = multer(
  { storage }

)

router.post('/:id/imagenes',
  upload.array('files', 20),
  async (req, res, next) => {
    try {
      // Ejecuto aqui una funcion
    } catch (error) {
      next(error)
    }
  }
)
