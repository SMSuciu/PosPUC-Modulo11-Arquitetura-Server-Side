const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
//const { postcardsPath } = require('../routes/postcards');
const postcardsPath = './postcards.json';


function listaCollecton(res) {
    fs.readFile(postcardsPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read postcards data.' });
        }

        const postcards = JSON.parse(data);
        //return res.postcards;
        res.json(postcards);
        
    });
}

function buscaRegistro(postId, res){
      fs.readFile(postcardsPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read postcards data.' });
        }
    
        const postcards = JSON.parse(data);
        const postcard = postcards.find((post) => post.id === postId);
    
        if (!postcard) {
          return res.status(404).json({ error: 'Postcard not found.' });
        }
    
        res.json(postcard);
      });
}

function incluiRegistro(res, req){
const { name, cidade, pais, descricao, imageUrl } = req.body;
 
  const newPostcard = {
    id: uuidv4(),
    name,
    cidade,
    pais,
    descricao,
    imageUrl,
  };

  fs.readFile(postcardsPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read postcards data.' });
    }

    const postcards = JSON.parse(data);
    postcards.push(newPostcard);

    fs.writeFile(postcardsPath, JSON.stringify(postcards, null, 2), (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to add new postcard.' });
      }

      res.status(201).json(newPostcard);
    });
  });
}

function deletaRegistro(res, id){
    //const { id } = req.params;
    
      fs.readFile(postcardsPath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Failed to read postcards data.' });
        }
    
        let postcards = JSON.parse(data);
        const postcardIndex = postcards.findIndex((item) => item.id === id);
    
        if (postcardIndex === -1) {
          return res.status(404).json({ error: 'Postcard not found.' });
        }
    
        postcards = postcards.filter((item) => item.id !== id);
    
        fs.writeFile(postcardsPath, JSON.stringify(postcards, null, 2), (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete postcard.' });
          }
    
          res.status(204).end();
        });
      });
}
exports.listaCollecton = listaCollecton;
exports.buscaRegistro = buscaRegistro;
exports.incluiRegistro = incluiRegistro;
exports.deletaRegistro = deletaRegistro;