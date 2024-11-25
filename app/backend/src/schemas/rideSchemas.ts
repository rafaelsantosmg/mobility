import Joi from "joi";

const rideEstimateSchema = Joi.object({
  origin: Joi.string().min(1).required().messages({
    "string.empty": "Endereço de origem é obrigatório.",
    "any.required": "Endereço de origem é obrigatório.",
  }),
  destination: Joi.string().min(1).required().messages({
    "string.empty": "Endereço de destino é obrigatório.",
    "any.required": "Endereço de destino é obrigatório.",
  }),
  customer_id: Joi.string().min(1).required().messages({
    "string.empty": "ID do usuário é obrigatório.",
    "any.required": "ID do usuário é obrigatório.",
  }),
});

export default rideEstimateSchema;