// models/StockModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const stockSchema = new Schema({
  nomeProduto: String,
  quantidade: Number,
  preco: Number,
});

const StockModel = mongoose.model('Stock', stockSchema);

module.exports = StockModel;