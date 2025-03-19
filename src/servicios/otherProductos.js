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

        // Se guardan la url de las imagenes en la base de datos
        const baseUrl = req.protocol + '://' + req.get('host')+ '/uploads/'
        const imagenesUrl = req.files.map(imagen => {
            return baseUrl + imagen.filename
        })

        


        const datos = JSON.parse(req.body.data)
        await crearCategoria(datos, transaction)
        await crearMarca(datos, transaction) 
        await crearMedida(datos, transaction)


        const producto = await Producto.create(datos, {
            transaction,
        });

        
        

        const id = producto.id  


        console.log("Id del producto recien creado", id)
        await ProductoImagen.bulkCreate(imagenesUrl.map(url => {
            console.log("id, url: ",id, url)
            return {
                producto_id: id,
                url_imagen: url,
                
            }
        }), {transaction})

        await transaction.commit()


        const productoFormateado = await cargarProducto(id)
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

        await Producto.update(datos, {
            where: {id: datos.id},
            transaction
        });

        const producto = await Producto.findByPk(datos.id, {
            transaction
        });
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
            where: {
                nombre: datos.marca
            },
            default: {
                nombre: datos.marca
            },
            transaction
        })
        
        datos.marca_id = marca.id
        
    }
    delete datos.marca
}

async function crearMedida(datos, transaction) {
    if (datos.medida) {
        const [medida, ] = await ProductoMedida.findOrCreate({
            where: {
                nombre: datos.medida
            },
            defaults: {
                nombre: datos.medida
            },
            transaction
        })

        datos.medida_id = medida.id
        
    }
    delete datos.medida
}

async function crearCategoria(datos, transaction){
    if (datos.categoria) {
        const [categoria, ] = await ProductoCategoria.findOrCreate({
            where: {
                nombre: datos.categoria
            },
            defaults: {
                nombre: datos.categoria
            },
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