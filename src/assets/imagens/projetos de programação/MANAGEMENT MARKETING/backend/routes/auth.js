const express = require('express');
const router = express.Router();
const { signup, login, getProfile, healthCheck } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Rotas públicas
router.post('/signup', signup);
router.post('/login', login);
router.get('/health', healthCheck);

// Rotas protegidas
router.get('/me', protect, getProfile);

module.exports = router;