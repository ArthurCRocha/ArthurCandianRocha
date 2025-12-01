const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// @desc    Registrar um novo usuário
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Verificar se o email já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Este email já está em uso' });
    }

    // Criar novo usuário
    const user = await User.create({
      name,
      email,
      password,
      phone: phone || null
    });

    // Se o usuário foi criado com sucesso
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Dados de usuário inválidos' });
    }
  } catch (error) {
    console.error('Erro no signup:', error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Autenticar usuário e gerar token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se o email existe
    const user = await User.findOne({ email });

    // Verificar se o usuário existe e a senha está correta
    if (user && (await user.matchPassword(password))) {
      // Verificar se a conta está ativa
      if (!user.isActive) {
        return res.status(401).json({ message: 'Sua conta está desativada' });
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Email ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Obter dados do usuário atual
// @route   GET /api/auth/me
// @access  Private
exports.getProfile = async (req, res) => {
  try {
    // req.user.id vem do middleware de autenticação
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// @desc    Verificar se o servidor está rodando
// @route   GET /api/health
// @access  Public
exports.healthCheck = (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
};