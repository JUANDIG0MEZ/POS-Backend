const {
    Producto,
    ProductoCategoria,
    ProductoMarca,
    ProductoMedida
} = require('../database/models')

async function cargarProductos() {
    const productos = await Producto.findAll({
            include: [
                { model: ProductoMedida, as: 'medida',  attributes: ['nombre'] },
                { model: ProductoCategoria, as: 'categoria', attributes: ['nombre'] },
                { model: ProductoMarca, as: 'marca', attributes: ['nombre'] }
            ]
        })
    
        const productosFormateados = productos.map(producto => {
            return {
                id: producto.id,
                nombre: producto.nombre,
                marca: producto.marca.nombre,
                categoria: producto.categoria.nombre,
                medida: producto.medida.nombre,
                precio_compra: producto.precio_compra,
                precio_venta: producto.precio_venta,
                cantidad: producto.cantidad,
                total: producto.total
            }
        })
    return productosFormateados
}

async function cargarProducto(id){
    const producto = await Producto.findByPk(id, {
        include: [
            { model: ProductoMedida, as: 'medida', attributes: ['nombre'] },
            { model: ProductoCategoria, as: 'categoria', attributes: ['nombre'] },
            { model: ProductoMarca, as: 'marca', attributes: ['nombre'] }
        ]
    })
    return producto
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
    cargarProducto,
    cargarCategorias,
    cargarMedidas,
    cargarMarcas
}