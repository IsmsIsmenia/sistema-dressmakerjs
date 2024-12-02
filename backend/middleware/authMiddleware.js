const authMiddleware = (req, res, next) => {
  console.log('Headers recebidos:', req.headers);

  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token ausente ou malformado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Erro na validação do token:', error);
    return res.status(403).json({ message: 'Token inválido' });
  }
};
