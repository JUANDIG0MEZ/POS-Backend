
const {
    // Producto,
    // Cliente,
    // ClienteTipo,
    ProductoMarca,
    ProductoMedida,
    ProductoCategoria,
    
    // CompraEstadoEntrega,
    // CompraEstadoPago,
    // VentaEstadoEntrega,
    // VentaEstadoPago,
    // Clientetipo,
    // MetodoPago,
    // sequelize
} = require('../../database/models')

const {col} = require('sequelize')


class InitOptions {
    static Producto (){
        const attributes = {
            exclude: ['categoria_id','medida_id', 'marca_id'],
            include: [
                [col('marcaProducto.nombre'), 'marca'],
                [col('medidaProducto.nombre'), 'medida'],
                [col('categoriaProducto.nombre'), 'categoria']
            ]
        }

        const include = [
            { model: ProductoMarca, attributes: [], as: 'marcaProducto' },
            { model: ProductoMedida, attributes: [], as: 'medidaProducto'},
            { model: ProductoCategoria, attributes: [], as: 'categoriaProducto'}
        ]

        return {
            attributes,
            include,
            
        }
    }


    static Cliente() {
        const attributes  = ['id', 'nombre' ]
        return {
            attributes,
            
        }
    }

    static ProductoMarca(){
        return {
            
        }
    }

    static ProductoCategoria(){
        return {
            
        }
    }

    static ProductoMedida(){
        return {
            
        }
    }

    static CompraEstadoEntrega() {
        return {
            
        }
    }

    static CompraEstadoPago(){
        return {
            
        }
    }

    static VentaEstadoEntrega(){
        return {
            
        }
    }

    static VentaEstadoPago(){
        return {
            
        }
    }

    static ClienteTipo () {
        return {
            
        }
    }

    static MetodoPago(){
        return {
            
        }
    }
}



module.exports = {
    InitOptions
}