const {
    Producto,
    ProductoCategoria,
    ProductoMarca,
    ProductoMedida
} = require('../database/models')

async function cargarProductos() {
    const productos = await Producto.findAll({
            //attributes: { exclude: ['marca_id', 'categoria_id', 'medida_id'] },
            include: [
                { model: ProductoMedida, attributes: ['nombre'], as: 'medidaProducto' },
                { model: ProductoCategoria, attributes: ['nombre'], as: 'categoriaProducto' },
                { model: ProductoMarca,attributes: ['nombre'], as: 'marcaProducto' }
            ]
        })
    
        const productosFormateados = productos.map(producto => {
            return {
                id: producto.id,
                nombre: producto.nombre,
                marca: producto.marcaProducto.nombre,
                categoria: producto.categoriaProducto.nombre,
                medida: producto.medidaProducto.nombre,
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
            { model: ProductoMedida, as: 'medidaProducto', attributes: ['nombre'] },
            { model: ProductoCategoria, as: 'categoriaProducto', attributes: ['nombre'] },
            { model: ProductoMarca, as: 'marcaProducto', attributes: ['nombre'] }
        ]
    })

    const productoFormateado = {
        id: producto.id,
        nombre: producto.nombre,
        marca: producto.marcaProducto.nombre,
        categoria: producto.categoriaProducto.nombre,
        medida: producto.medidaProducto.nombre,
        precio_compra: producto.precio_compra,
        precio_venta: producto.precio_venta,
        cantidad: producto.cantidad,
        total: producto.total
    }
    return productoFormateado
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