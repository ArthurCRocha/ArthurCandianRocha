const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome é obrigatório']
    },
    email: {
      type: String,
      required: [true, 'Email é obrigatório'],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Por favor, forneça um email válido'
      ]
    },
    password: {
      type: String,
      required: [true, 'Senha é obrigatória'],
      minlength: 6
    },
    phone: {
      type: String,
      default: null
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Middleware para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
  // Só executa se a senha for modificada ou for nova
  if (!this.isModified('password')) {
    return next();
  }

  // Criptografa a senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para comparar senhas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;