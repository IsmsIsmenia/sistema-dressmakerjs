const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obter o token do cabeçalho da requisição
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    // Validar o token
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded; // Adiciona os dados do usuário no objeto req
    next(); // Prosseguir para a próxima etapa
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
