const {
    Producto,
    ProductoMedida,
    ProductoMarca,
    ProductoCategoria,
    sequelize
} = require('../database/models');

const {
    cargarProducto
} = require('./getProductos');
async function crearProducto(datos) {

    const transaction = await sequelize.transaction();
    try {
        await crearCategoria(datos, transaction)
        await crearMarca(datos, transaction) 
        await crearMedida(datos, transaction)


        const producto = await Producto.create(datos, {
            transaction,
        });

        const id = producto.id;
        
        transaction.commit();
        const productoFormateado = await cargarProducto(id);
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