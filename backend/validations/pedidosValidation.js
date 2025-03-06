const Joi = require('joi');

const pedidoSchema = Joi.object({
  cliente: Joi.string().min(3).max(100).required(),
  descricao: Joi.string().min(5).max(255).required(),
  valor: Joi.number().min(0).required(),
  status: Joi.string().valid('Em andamento', 'Concluído', 'Cancelado').required(),
});

const validatePedido = (req, res, next) => {
  const { error } = pedidoSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ errors: error.details.map(err => err.message) });
  }

  next();
};

module.exports = validatePedido;
