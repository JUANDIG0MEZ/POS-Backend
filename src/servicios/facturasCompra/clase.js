
const {
    CompraEstado,
    Cliente,
} = require('../../database/models')


const { Op } = require('sequelize')

class ClaseFacturaCompra {
    static incluir(){
        return [
            {model: CompraEstado, attributes: ['nombre'], as: 'estadoCompra'},
            {model: Cliente, attributes: ['nombre'], as: 'clienteCompra'},
        ]
    }


    static formatear(facturas) {
        return facturas.map(factura => {
            return {
                id: factura.id,
                fecha: factura.fecha,
                hora: factura.hora,
                cliente: factura.clienteCompra.nombre,
                estado_id: factura.estado_id,
                pagado: factura.pagado,
                por_pagar: factura.por_pagar,
                total: factura.total,
            }
        })
    }


    static where(query){
        const where = {}

        if (Number(query.id)){
            where.id = query.id
            return where
        }

        if (Number(query.estado_id)) {
            where.estado_id = query.estado_id
        }

        if (Number(query.cliente_id)) {
            where.cliente_id = Number(query.cliente_id)
        }

        if (query.fecha_desde || query.fecha_hasta) {
            if (!query.fecha_desde) {
                query.fecha_desde = '1900-01-01'
            }
            if (!query.fecha_hasta) {
                query.fecha_hasta = new Date().toISOString().split('T')[0] // Fecha actual
            }

            where.fecha = {
                [Op.between]: [query.fecha_desde, query.fecha_hasta]
            }
        }

        
        return where
    }

}




module.exports = {
    ClaseFacturaCompra
}