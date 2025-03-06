const {
    Producto,
    ProductoMedida,
    ProductoMarca,
    ProductoCategoria,
    sequelize
} = require('../database/models');

async function crearProducto(datos) {

    const transaction = await sequelize.transaction();
    // Si llega un string se debe crear una nueva medida
    try {
        if (!datos.medida.id){
            const medida = await ProductoMedida.create({
                nombre: datos.medida.nombre
            });
            datos.medida_id = medida.id
            delete datos.medida
        }
        else {
            datos.medida_id = datos.medida.id
            delete datos.medida
        }
        // Si llega un string se debe crear una nueva marca
        if (!datos.marca.id){
            const marca = await ProductoMarca.create({
                nombre: datos.marca.nombre
            });
            datos.marca_id = marca.id
            delete datos.marca
        }
        else{
            datos.marca_id = datos.marca.id
            delete datos.marca
        }
        // Si llega un string se debe crear una nueva categoria
        if (!datos.categoria.id){
            const categoria = await ProductoCategoria.create({
                nombre: datos.categoria.nombre
            });
            datos.categoria_id = categoria.id
            delete datos.categoria
        }
        else {
            datos.categoria_id = datos.categoria.id
            delete datos.categoria
        }
        const producto = await Producto.create(datos);
        return producto;
    }
    catch (error) {
        await transaction.rollback();
        throw error;
    }
    
}

async function modificarProducto(id, datos) {
    const producto = await Producto.findByPk(id);
    await producto.update(datos);
    return producto;
}


module.exports = {
    crearProducto,
    modificarProducto
};