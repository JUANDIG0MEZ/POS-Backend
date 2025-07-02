const Joi = require('joi')
const schema = Joi.object({
  limit: Joi.number().integer().min(0).max(50),
  offset: Joi.number().integer()
})
const result = schema.validate({ limit: '25', offset: '0' }, { convert: true })
console.log(result)
