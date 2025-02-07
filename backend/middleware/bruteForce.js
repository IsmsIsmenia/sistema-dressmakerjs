const rateLimit = require('express-rate-limit');

const bruteForceMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo de 5 tentativas por IP em 15 min
  message: { error: "Muitas tentativas de login. Tente novamente mais tarde." },
  standardHeaders: true, // Envia headers informando a limitação
  legacyHeaders: false, // Remove headers obsoletos
});

module.exports = bruteForceMiddleware;
