const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'sua_url_de_conexao_mongodb';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defina o esquema do seu modelo MongoDB para "Stock"
const Schema = mongoose.Schema;
const stockSchema = new Schema({
  nomeProduto: String,
  quantidade: Number,
  preco: Number,
});

const StockModel = mongoose.model('Stock', stockSchema);

// Rota para criar um novo registro de estoque
app.post('/estoque', async (req, res) => {
  try {
    const { nomeProduto, quantidade, preco } = req.body;
    const novoItemEstoque = new StockModel({ nomeProduto, quantidade, preco });
    await novoItemEstoque.save();
    res.json({ mensagem: 'Registro de estoque criado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar registro de estoque' });
  }
});

// Rota para ler todos os registros de estoque
app.get('/estoque', async (req, res) => {
  try {
    const estoqueItens = await StockModel.find();
    res.json(estoqueItens);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar registros de estoque' });
  }
});

// Rota para atualizar um registro de estoque pelo ID
app.put('/estoque/:id', async (req, res) => {
  try {
    const { nomeProduto, quantidade, preco } = req.body;
    const { id } = req.params;
    await StockModel.findByIdAndUpdate(id, { nomeProduto, quantidade, preco });
    res.json({ mensagem: 'Registro de estoque atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar registro de estoque' });
  }
});

// Rota para excluir um registro de estoque pelo ID
app.delete('/estoque/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await StockModel.findByIdAndRemove(id);
    res.json({ mensagem: 'Registro de estoque excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir registro de estoque' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
