const Joi = require('joi');

// Validação para registro de usuário
const registerSchema = Joi.object({
  nome: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
  tipo: Joi.string().valid('cliente', 'administrador').optional(),
});

// Validação para login de usuário
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().min(6).required(),
});

module.exports = { registerSchema, loginSchema };
