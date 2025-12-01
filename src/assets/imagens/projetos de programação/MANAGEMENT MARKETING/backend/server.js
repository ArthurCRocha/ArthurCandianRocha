const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Carregar variáveis de ambiente
dotenv.config();

// Conectar ao banco de dados
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', require('./routes/auth'));

// Rota padrão para verificação do servidor
app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em modo ${process.env.NODE_ENV} na porta ${PORT}`);
});