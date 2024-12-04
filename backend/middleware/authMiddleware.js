const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Isso vai pegar o token após "Bearer"
  if (!token) {
    return res.status(401).json({ error: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Adiciona o ID do usuário no request
    req.userRole = decoded.role; // Adiciona o papel (role) do usuário no request
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
