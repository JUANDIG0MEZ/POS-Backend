
const {
    ClienteTipo
} = require('../../database/models')




class ClaseCliente {

    static excluir(){

    }

    static incluir() {
        return [
            { model: ClienteTipo, as: 'tipoCliente', attributes: ['nombre']}
        ]
    }

    static where(query) {
        const where = {}

        if (Number(query.id)) {
            where.id = query.id
            return where
        }


        if (Number(query.tipo_id)) {
            where.tipo_id = query.tipo_id
        }

        return where
    }

    static formatear(clientes) {
        return clientes.map(cliente => {


            return {
                id: cliente.id,
                nombre: cliente.nombre,
                direccion: cliente.direccion,
                telefono: cliente.telefono,
                email: cliente.email,
                tipo: cliente.tipoCliente.nombre,
                por_pagarle: cliente.por_pagarle,
                debe: cliente.debe,

            }
        })
    }

    static order(query) {
        const orden = query.orden? query.orden : 'ASC'
        const columna = query.columna? query.columna : 'id'

        return [[columna, orden]]
    }
}

module.exports = {
    ClaseCliente,
}
