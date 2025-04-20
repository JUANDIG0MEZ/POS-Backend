const {
    Producto,
    ProductoMedida,
    ProductoMarca,
    ProductoCategoria,
    ProductoImagen,
    sequelize,

} = require('../database/models');

const {
    cargarProducto
} = require('./getProductos');



async function crearProducto(req) {
    const transaction = await sequelize.transaction();
    try {
        const datos = JSON.parse(req.body.data)


        await crearCategoria(datos, transaction)
        await crearMarca(datos, transaction) 
        await crearMedida(datos, transaction)


        const producto = await Producto.create(datos, {transaction});
        
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

        await transaction.commit()


        const productoFormateado = await cargarProducto(producto.id)
        return productoFormateado;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
    
    
}

async function modificarProducto(datos) { 
    const transaction = await sequelize.transaction();
    try {
        await crearCategoria(datos, transaction)

        const producto = await Producto.findByPk(datos.id, {
            transaction,
            lock: transaction.LOCK.UPDATE
        })

        await producto.update(datos, {transaction})

        await transaction.commit();
        return producto;
    }
    catch(error) {
        await transaction.rollback();
        throw error;
    }
}

async function crearMarca(datos, transaction) {
    if (datos.marca) {
        const [marca, ] = await ProductoMarca.findOrCreate({
            where: {nombre: datos.marca},
            defaults: {nombre: datos.marca},
            transaction
        })
        datos.marca_id = marca.id
    }
    delete datos.marca
}

async function crearMedida(datos, transaction) {
    if (datos.medida) {
        const [medida, ] = await ProductoMedida.findOrCreate({
            where: {nombre: datos.medida},
            defaults: {nombre: datos.medida},
            transaction
        })

        datos.medida_id = medida.id
        
    }
    delete datos.medida
}

async function crearCategoria(datos, transaction){
    if (datos.categoria) {
        const [categoria, ] = await ProductoCategoria.findOrCreate({
            where: {nombre: datos.categoria},
            defaults: {nombre: datos.categoria},
            transaction
        })

        datos.categoria_id = categoria.id
        
    }
    delete datos.categoria
}

module.exports = {
    crearProducto,
    modificarProducto
};