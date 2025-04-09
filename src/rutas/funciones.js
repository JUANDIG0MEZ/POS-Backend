

function respuesta(mensaje, data, status = true) {
    return {
        success: status,
        message: mensaje,
        data: data
    }
}


module.exports = {
    respuesta
}