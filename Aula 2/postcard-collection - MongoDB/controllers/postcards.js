const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ObjectId } = require('mongodb');
const postcardsPath = './postcards.json';

//Variaveis Monmgo
//informaçoes para acessar o banco de dados
const url = 'mongodb://localhost:27017';
const dbName = 'postcardsDB'; //nome do data base
const collectionName = 'postcards'; // no banco NOSQL, o BD tem suas collections. Cada Collectioon com seu nome.

//Funcao que busca por arquivo json
//function listaCollecton(res) {
//    fs.readFile(postcardsPath, 'utf8', (err, data) => {
//        if (err) {
//            console.error(err);
//            return res.status(500).json({ error: 'Failed to read postcards data.' });
//        }

//        const postcards = JSON.parse(data);
//        res.json(postcards);      
//    });
//}

async function listaCollectonMongo(res){
  const client = new MongoClient(url); //cria um cliente de acesso usando a url.  
                                        //A URL sao as informaçoes declaradas acima para acessar o banco de dados
try{
      await client.connect(); // tenta a conexão
      const db = client.db(dbName); //recebe a collection
      const collection = db.collection(collectionName);
      const postcards = await collection.find().toArray();
      res.json(postcards);
    } catch (erro){
      console.erro(erro);
      res.status(500).json({erro: 'Erro ao buscar lista de postcard'});
    } finally{
      await client.close();
    };
}

//function buscaRegistro(postId, res){
//      fs.readFile(postcardsPath, 'utf8', (err, data) => {
//        if (err) {
//          console.error(err);
//          return res.status(500).json({ error: 'Failed to read postcards data.' });
//        }
    
//        const postcards = JSON.parse(data);
//        const postcard = postcards.find((post) => post.id === postId);
    
//        if (!postcard) {
//          return res.status(404).json({ error: 'Postcard not found.' });
//        }
    
//        res.json(postcard);
//      });
//}

async function buscaRegistroMongo(res){
  const client = new MongoClient(url); //cria um cliente de acesso usando a url.  
                                        //A URL sao as informaçoes declaradas acima para acessar o banco de dados
try{
      await client.connect(); // tenta a conexão
      const db = client.db(dbName); //recebe a collection
      const collection = db.collection(collectionName);
      const postcards = await collection.find().toArray();
      res.json(postcards);
    } catch (erro){
      console.erro(erro);
      res.status(500).json({erro: 'Erro ao buscar lista de postcard'});
    } finally{
      await client.close();
    };
}

//Inclui registro no arquvo json
//function incluiRegistro(res, req){
//const { name, cidade, pais, descricao, imageUrl } = req.body;
 
//  const newPostcard = {
//    id: uuidv4(),
//    name,
//    cidade,
//   pais,
//    descricao,
//    imageUrl,
//  };

//  fs.readFile(postcardsPath, 'utf8', (err, data) => {
//    if (err) {
//      console.error(err);
//      return res.status(500).json({ error: 'Failed to read postcards data.' });
//    }

//    const postcards = JSON.parse(data);
//    postcards.push(newPostcard);
//
//    /fs.writeFile(postcardsPath, JSON.stringify(postcards, null, 2), (err) => {
//      if (err) {
//        console.error(err);
//        return res.status(500).json({ error: 'Failed to add new postcard.' });
//      }

//      res.status(201).json(newPostcard);
//    });
//  });
//}

async function incluiRegistroMongo(res, req){
  const { name, cidade, pais, descricao, imageUrl } = req.body;
   
    const newPostcard = {
      id: uuidv4(),
      name,
      cidade,
      pais,
      descricao,
      imageUrl,
    };
  
    const client = new MongoClient(url); //cria um cliente de acesso usando a url.  
                                        //A URL sao as informaçoes declaradas acima para acessar o banco de dados

    try{
      await client.connect(); // tenta a conexão
      const db = client.db(dbName); //recebe a collection
      const collection = db.collection(collectionName);
      const result = await collection.insertOne(newPostcard); //função que insert do novo item
      //const result = await collection.incluiRegistroMongo(newPostcards); //função que insert do novo item
      newPostcard._id = result.insertedId; // se inserir ok, gera um id
      res.status(201).json(newPostcard); // codigo de sucesso
    } catch (erro){
      console.erro(erro);
      res.status(500).json({erro: 'Erro ao adicionar postcard'});
    } finally{
      await client.close();
    };    
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
//exports.listaCollecton = listaCollecton;
//exports.buscaRegistro = buscaRegistro;
//exports.incluiRegistro = incluiRegistro;
exports.deletaRegistro = deletaRegistro;

//exports MongoDB
exports.incluiRegistroMongo = incluiRegistroMongo;
exports.listaCollectonMongo = listaCollectonMongo;
exports.buscaRegistroMongo = buscaRegistroMongo;