const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'administrador') {  // Verifique se o valor corresponde exatamente
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();  // Se for administrador, permite continuar
};

module.exports = adminMiddleware;
