const Decimal = require('decimal.js')

const MAX_SAFE = new Decimal(Number.MAX_SAFE_INTEGER / 1000 - 1)
const MIN_SAFE = new Decimal(Number.MIN_SAFE_INTEGER / 1000 + 1)

// Configuración global (solo una vez en tu aplicación)
Decimal.set({
  precision: 20,
  rounding: Decimal.ROUND_HALF_UP // Redondeo bancario estándar
})

function esNumeroSeguro (valor) {
  const value = new Decimal(valor)
  if (value.lt(MIN_SAFE) || value.gt(MAX_SAFE)) throw new Error('El valor fuera de los limites')
  return true
}

function redondear (valor, decimales = 3) {
  const num = new Decimal(valor)
  esNumeroSeguro(num)
  const resultado = num.toDecimalPlaces(decimales)
  return resultado
}

function multiplicarYRedondear (valor1, valor2, decimales = 3) {
  const num1 = new Decimal(valor1)
  const num2 = new Decimal(valor2)
  const resultado = num1.times(num2)
  return redondear(resultado, decimales)
}

module.exports = {
  esNumeroSeguro,
  multiplicarYRedondear,
  redondear
}
