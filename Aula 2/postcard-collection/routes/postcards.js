var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { listaCollecton, buscaRegistro, incluiRegistro, deletaRegistro } = require('../controllers/postcards');

// Rota GET para obter todos os Postcards
router.get('/', (req, res) => {
    listaCollecton(res);
});

//Rota para trazer apenas 1 registro
router.get('/:id', (req, res) => {
    const postId = req.params.id;
    buscaRegistro(postId, res);
});

//Rota de inclusao
router.post('/', (req, res) => {
    incluiRegistro(res, req);
});

//Rota de exclusao
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deletaRegistro(res, id);
});

module.exports = router;