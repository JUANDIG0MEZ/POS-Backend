const {
  Producto,
  ProductoMedida,
  ProductoCategoria,
  ProductoImagen,
  sequelize

} = require('../../database/models')

const {
  ErrorUsuario
} = require('../../errors/ErrorUsuario')

const {
  ClaseProducto
} = require('./clase')

// async function AgregarImagenes () {
//   // Se guardan la url de las imagenes en la base de datos
//   const baseUrl = req.protocol + '://' + req.get('host') + '/uploads/'
//   let imagenesUrl = req.files.map(imagen => { return baseUrl + imagen.filename })

//   imagenesUrl = imagenesUrl.map(url => {
//     return {
//       producto_id: producto.id,
//       url_imagen: url
//     }
//   })

//   await ProductoImagen.bulkCreate(imagenesUrl, { transaction })
// }

async function crearProducto (body) {
  const transaction = await sequelize.transaction()
  try {
    await crearMedida(body, transaction)

    const productoCreado = await Producto.create(body, { transaction })

    const producto = await Producto.findByPk(productoCreado.id, {
      attributes: ClaseProducto.atributos(),
      include: ClaseProducto.incluir(),
      transaction
    })

    console.log(producto)

    await transaction.commit()

    return {
      producto
    }
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

async function crearMedida (datos, transaction) {
  if (datos.medida) {
    const [medida] = await ProductoMedida.findOrCreate({
      where: { nombre: datos.medida },
      defaults: { nombre: datos.medida },
      transaction
    })

    datos.medida_id = medida.id
  }
  delete datos.medida
}

async function crearCategoria (body) {
  const [categoria, creado] = await ProductoCategoria.findOrCreate({
    where: { nombre: body.nombre },
    defaults: { nombre: body.nombre, descripcion: body.descripcion }
  })

  if (!creado) {
    throw new ErrorUsuario('La categoria ya existe')
  }

  return { categoria }
}

module.exports = {
  crearProducto,
  crearCategoria
}
