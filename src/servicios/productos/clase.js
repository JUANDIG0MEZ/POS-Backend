const {
    ProductoMedida,
    ProductoCategoria,
    ProductoMarca,
} = require('../../database/models')



class ClaseProducto {

    static excluir(permisos){

        const atributos = []

        if (!permisos.precio_compra){
            atributos.push("precio_compra")
        }
        if (!permisos.cantidad){
            atributos.push("cantidad")
        }
        if (!permisos.total){
            atributos.push("total")
        }
        return atributos
    }

    static incluir(){
        return [
            { model: ProductoMedida, attributes: ['nombre'], as: 'medidaProducto' },
            { model: ProductoCategoria, attributes: ['nombre'], as: 'categoriaProducto' },
            { model: ProductoMarca,attributes: ['nombre'], as: 'marcaProducto' },
        ]
    }

    static formatear(productos, permisos){
        return productos.map(producto => {
            return {
                id: producto.id,
                nombre: producto.nombre,
                marca: producto.marcaProducto ? producto.marcaProducto.nombre : "",
                categoria: producto.categoriaProducto ? producto.categoriaProducto.nombre : "",
                medida: producto.medidaProducto ? producto.medidaProducto.nombre : "",    
                precio_venta: producto.precio_venta,


                precio_compra: permisos.precio_compra ? producto.precio_compra : null,
                cantidad: permisos.cantidad ? producto.cantidad : null,
                total: permisos.total ? producto.total : null
            }
        })
    }

}


module.exports = {
    ClaseProducto
}