const { Cliente, Secuencia, sequelize } = require('../../database/models')
const { FormatearClientes } = require('./formatear/index.js')
const { OpcionesGet } = require('./opciones/get.js')
async function crearCliente ({ idUsuario, nombre, direccion, telefono, email, id_tipo }) {
  const transaction = await sequelize.transaction()
  try {
    const secuencia = await Secuencia.findOne({
      where: { id: idUsuario },
      transaction
    })

    const cliente_id = secuencia.cliente_id

    const nuevoCliente = {
      id_usuario: idUsuario,
      cliente_id,
      nombre,
      direccion,
      telefono,
      email,
      id_tipo
    }

    await Cliente.create(nuevoCliente, { transaction })

    secuencia.cliente_id += 1
    await secuencia.save({ transaction })

    const cliente = await Cliente.findOne({
      where: { id_usuario: idUsuario, cliente_id },
      attributes: OpcionesGet.atributos(),
      include: OpcionesGet.incluir(),
      transaction,
      raw: true
    })

    await transaction.commit()
    return FormatearClientes.formatear(cliente)
  } catch (error) {
    await transaction.rollback()
    throw (error)
  }
}

module.exports = {
  crearCliente
}
