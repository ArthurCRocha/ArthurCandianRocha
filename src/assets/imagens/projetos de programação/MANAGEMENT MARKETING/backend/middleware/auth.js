const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // Verificar se o token está no header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extrair o token do header
      token = req.headers.authorization.split(' ')[1];

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adicionar o usuário ao request (sem a senha)
      req.user = await User.findById(decoded.id).select('-password');

      // Verificar se o usuário ainda existe
      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não existe' });
      }

      // Verificar se o usuário está ativo
      if (!req.user.isActive) {
        return res.status(401).json({ message: 'Sua conta está desativada' });
      }

      next();
    } catch (error) {
      console.error('Erro no middleware de autenticação:', error);
      res.status(401).json({ message: 'Não autorizado, token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, token não fornecido' });
  }
};

// Middleware para verificar se o usuário é admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Não autorizado como administrador' });
  }
};

module.exports = { protect, admin };