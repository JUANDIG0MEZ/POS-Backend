
const {
    Cliente,
    ProductoMedida,
    ProductoCategoria,
    ProductoMarca,
} = require('../modelos/cliente')




function formatearFull(cliente) {
    await cliente.reload({
        include: [
            { model: ProductoMedida, attributes: ['nombre'], as: 'medidaProducto' },
            { model: ProductoCategoria, attributes: ['nombre'], as: 'categoriaProducto' },
            { model: ProductoMarca,attributes: ['nombre'], as: 'marcaProducto' },
        ]
    })
}