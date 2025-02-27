const {
    Producto,
    ProductoCategoria,
    ProductoMarca,
    ProductoMedida
} = require('../database/models')

async function cargarProductos() {
    const productos = await Producto.findAll({
            attributes: { exclude: ['marca_id', 'categoria_id', 'medida_id'] },
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

    const productoFormateado = {
        id: producto.id,
        nombre: producto.nombre,
        marca: producto.marca.nombre,
        marcad_id: producto.marca_id,
        categoria: producto.categoria.nombre,
        categoria_id: producto.categoria_id,
        medida: producto.medida.nombre,
        medida_id: producto.medida_id,
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