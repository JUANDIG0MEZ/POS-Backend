const Decimal = require('decimal.js')

const MAX_SAFE = Number.MAX_SAFE_INTEGER / 1000 - 1
const MIN_SAFE = Number.MIN_SAFE_INTEGER / 1000 + 1

// Configuración global (solo una vez en tu aplicación)
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP // Redondeo bancario estándar
})

function esNumeroSeguro (valor) {
  if (!Number.isFinite(valor)) throw new Error('Valor invalido o no numerico')
  if (valor > MAX_SAFE || valor < MIN_SAFE) throw new Error('El valor fuera de los limites')
}

function redondear (valor, decimales = 3) {
  const num = new Decimal(valor)
  const resultado = num.toDecimalPlaces(decimales).toNumber()
  esNumeroSeguro(resultado)
  return Number(resultado)
}

function multiplicarYRedondear (valor1, valor2, decimales = 3) {
  const num1 = new Decimal(valor1)
  const num2 = new Decimal(valor2)
  const resultado = num1.times(num2).toNumber()
  esNumeroSeguro(resultado)
  return redondear(resultado, decimales)
}

module.exports = {
  esNumeroSeguro,
  multiplicarYRedondear,
  redondear
}
