// routes/estoqueRoutes.js
const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

router.post('/', estoqueController.createStockItem);
// Defina outras rotas para as operações CRUD

module.exports = router;