
const {
    ProductoImagen,
    Producto,
    sequelize
} = require('../../database/models')

const {
    crearCategoria
} = require('./postProducto')

const path = require('path')
const fs = require('fs').promises




async function modificarProducto(req, id) { 
    const transaction = await sequelize.transaction();
    try {
        const body = JSON.parse(req.body.data)

        // Se eliminan las imagenes que se borraron
        const ruta = path.join(__dirname, '../../../uploads')

        if ("borradas" in body){
            for (const urlBorrada of body.borradas){
                
                const fueBorrada = await ProductoImagen.destroy({
                    where: {
                        producto_id: id,
                        url_imagen: urlBorrada
                    },
                    transaction
                })

                if (fueBorrada){
                    // Borrar imagen del servidor
                    const nombreImagen = urlBorrada.split('/').pop()
                    const rutaImagen = path.join(ruta, nombreImagen)

                    await fs.unlink(rutaImagen)

                }
            }
            delete body.borradas
        }



        
        if ("categoria" in body){
            await crearCategoria(body, transaction)
        }


        const producto = await Producto.findByPk(id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        })

        await producto.update(body, {transaction})


        // Se guardan la url de las imagenes en la base de datos
        const baseUrl = req.protocol + '://' + req.get('host')+ '/uploads/'
        let imagenesUrl = req.files.map(imagen => {return baseUrl + imagen.filename})
        
        imagenesUrl = imagenesUrl.map(url => {
            return {
                producto_id: producto.id,
                url_imagen: url,        
            }
        })


        await ProductoImagen.bulkCreate(imagenesUrl, {transaction})

        await transaction.commit();
        return true
    }
    catch(error) {
        await transaction.rollback();
        throw error;
    }
}


module.exports = {
    modificarProducto
}