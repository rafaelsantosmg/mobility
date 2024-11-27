import Joi from 'joi'

const rideEstimateSchema = Joi.object({
  origin: Joi.string().min(1).required().messages({
    'string.empty': 'Endereço de origem é obrigatório.',
    'any.required': 'Endereço de origem é obrigatório.',
  }),
  destination: Joi.string().min(1).required().messages({
    'string.empty': 'Endereço de destino é obrigatório.',
    'any.required': 'Endereço de destino é obrigatório.',
  }),
  customer_id: Joi.string().min(1).required().messages({
    'string.empty': 'ID do usuário é obrigatório.',
    'any.required': 'ID do usuário é obrigatório.',
  }),
})

export const rideConfirmSchema = Joi.object({
  customer_id: Joi.string().min(1).required().messages({
    'string.empty': 'ID do usuário é obrigatório.',
    'any.required': 'ID do usuário é obrigatório.',
  }),
  origin: Joi.string().min(1).required().messages({
    'string.empty': 'Endereço de origem é obrigatório.',
    'any.required': 'Endereço de origem é obrigatório.',
  }),
  destination: Joi.string().min(1).required().messages({
    'string.empty': 'Endereço de destino é obrigatório.',
    'any.required': 'Endereço de destino é obrigatório.',
  }),
  distance: Joi.number().min(1).required().messages({
    'number.base': 'Distância deve ser um número.',
    'number.min': 'Distância deve ser maior ou igual a 1.',
    'any.required': 'Distância é obrigatória.',
  }),
  duration: Joi.string().min(1).required().messages({
    'string.empty': 'Duração é obrigatória.',
    'any.required': 'Duração é obrigatória.',
  }),
  driver: Joi.object({
    id: Joi.number().min(1).required().messages({
      'number.base': 'ID do motorista deve ser um número.',
      'number.min': 'ID do motorista deve ser maior ou igual a 1.',
      'any.required': 'ID do motorista é obrigatório.',
    }),
    name: Joi.string().min(1).required().messages({
      'string.empty': 'Nome do motorista é obrigatório.',
      'any.required': 'Nome do motorista é obrigatório.',
    }),
  })
    .required()
    .messages({
      'any.required': 'Dados do motorista são obrigatórios.',
    }),
  value: Joi.number().min(1).required().messages({
    'number.base': 'Valor deve ser um número.',
    'number.min': 'Valor deve ser maior ou igual a 1.',
    'any.required': 'Valor é obrigatório.',
  }),
})

export default rideEstimateSchema
