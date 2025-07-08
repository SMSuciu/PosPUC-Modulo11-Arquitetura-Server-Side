var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
//const { listaCollecton, buscaRegistro, deletaRegistro, incluiRegistro } = require('../controllers/postcards'); //arquivo json
const { listaCollectonMongo, buscaRegistroMongo, deletaRegistro, incluiRegistroMongo } = require('../controllers/postcards'); //MongoDB


//--=====================================================================--
// Rota GET para obter todos os Postcards

//Json
//router.get('/', (req, res) => {
//    listaCollecton(res);
//});

// MongoDB
router.get('/', (req, res) => {
    listaCollectonMongo(res);
});

//--=====================================================================--
//Rota para trazer apenas 1 registro
//Json
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  buscaRegistro(postId, res);
});

//MongoDB
//router.get('/:id', (req, res) => {
//    const postId = req.params.id;
//    buscaRegistroMongo(postId, res);
//});


//--=====================================================================--
//Rota de inclusao arquivo

//Json
//router.post('/', (req, res) => {
//    incluiRegistro(res, req);
//});

//MongoDb
router.post('/', (req, res) => {
    incluiRegistroMongo(res, req);
});

//--=====================================================================--

//Rota de exclusao
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    deletaRegistro(res, id);
});
//--=====================================================================--


module.exports = router;