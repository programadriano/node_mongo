// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const estoqueRoutes = require('./routes/estoqueRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'localhost:27017/db_local';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ... (tratamento de erros de conexão com o MongoDB, configuração do bodyParser, etc.)

// Use as rotas definidas no estoqueRoutes
app.use('/estoque', estoqueRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
