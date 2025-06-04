
const {
    Cliente,
    VentaEstadoEntrega,
    VentaEstadoPago,
} = require('../../database/models')

const { Op } = require('sequelize')

class ClaseFacturaVenta {
    static incluir(){
        return [
            {model: VentaEstadoEntrega, as: 'estadoEntregaVenta', attributes: ['nombre']},
            {model: VentaEstadoPago, as: 'estadoPagoVenta', attributes: ['nombre']},
            {model: Cliente, as: 'clienteVenta', attributes: ['nombre']},
        ]
    }

    static formatear(facturas) {
        return facturas.map(factura => {
            return {
                id: factura.id,
                fecha: factura.fecha,
                hora: factura.hora,
                cliente: factura.clienteVenta.nombre,
                direccion: factura.direccion,
                estado_entrega: factura.estadoEntregaVenta.nombre,
                estado_pago: factura.estadoPagoVenta.nombre,
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

        if (Number(query.estado_entrega_id)) {
            where.estado_entrega_id = query.estado_entrega_id
        }

        if (Number(query.estado_pago_id)) {
            where.estado_pago_id = query.estado_pago_id
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


    static orden(query){
        const orden = query.orden? query.orden : 'ASC'
        const columna = query.columna? query.columna : 'id'

        if (columna === 'cliente') {
            return [[{model: Cliente, as: 'clienteVenta'}, 'nombre', orden]]
        }

        return [[columna, orden]]
        
    }
}
module.exports = {
    ClaseFacturaVenta,

}