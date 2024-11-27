const adminMiddleware = (req, res, next) => { 
    // Verifica se o usuário tem a permissão 'admin'
    if (req.userRole !== 'administrador') {
      return res.status(403).json({ error: 'Acesso negado' });
    }
    // Se for admin, deixa continuar
    next();
  };
  
  module.exports = adminMiddleware;
  