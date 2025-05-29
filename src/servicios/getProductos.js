const { ProductoImagen } = require('../database/models')

const {
    Producto,
    ProductoCategoria,
    ProductoMarca,
    ProductoMedida
} = require('../database/models')


const {
    ClaseProducto
} = require('./productos/clase')

async function cargarProductos() {

    const permisos = {precio_compra: true, cantidad: true, total: true}

    const productos = await Producto.findAll({
            //attributes: { exclude: ['marca_id', 'categoria_id', 'medida_id'] },
            include: ClaseProducto.incluir(),
            exclude: ClaseProducto.excluir(permisos),
            order: [['id', 'DESC']]

        })

    const productosFormateados = ClaseProducto.formatear(productos, permisos)
    
    return productosFormateados
}

// async function cargarProducto(id) {

//     permisos = {precio_compra: true, cantidad: true, total: true}
//     const producto = await Producto.findByPk(id, {
//         include: [
//             { model: ProductoMedida, as: 'medidaProducto', attributes: ['nombre'] },
//             { model: ProductoCategoria, as: 'categoriaProducto', attributes: ['nombre'] },
//             { model: ProductoMarca, as: 'marcaProducto', attributes: ['nombre'] }
//         ],
//         order: [['id', 'DESC']]
//     })
//     const productoFormateado = {
//         id: producto.id,
//         nombre: producto.nombre,
//         marca: producto.marcaProducto ? producto.marcaProducto.nombre : "",
//         categoria: producto.categoriaProducto ? producto.categoriaProducto.nombre : "",
//         medida: producto.medidaProducto ? producto.medidaProducto.nombre : "",
//         precio_compra: producto.precio_compra,
//         precio_venta: producto.precio_venta,
//         cantidad: producto.cantidad,
//         total: producto.total
//     }
//     return productoFormateado
// }

async function cargarImagenesProducto(id) {
    const imagenes = await ProductoImagen.findAll({
        where: { producto_id: id }
    })
    return imagenes.map(imagen => imagen.url_imagen)
}


async function cargarCategorias() {
    const categorias = await ProductoCategoria.findAll()
    return categorias
}

async function cargarMedidas() {
    const medidas = await ProductoMedida.findAll()

    return medidas
}

async function cargarMarcas() {
    const marcas = await ProductoMarca.findAll()

    return marcas
}



module.exports = {
    cargarProductos,
    // cargarProducto,
    cargarCategorias,
    cargarMedidas,
    cargarMarcas,
    cargarImagenesProducto
}