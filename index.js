const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;
const mongoose = require('mongoose');

// data 
const Person = require('./models/persons'); 

// connect mongoDB
// mongoose.connect('mongodb://localhost:marvel')

// connect with mlab
mongoose.connect('mongodb://csp-marvel:672%40j179@ds147684.mlab.com:47684/marvel', 
  { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('CONNECTED');
  })
  .catch((err) => {
    console.log('MONGODB', err);
  });
 
const router = express.Router();

router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

router.get('/', (request, response) => {
  response.json({message: 'Hello Marvel or DC Comics?'});
});

/*
  Create a new member this marvel -> POST
  List all members this marvel -> GET
*/
router.route('/persons')
  .post((req, res) => {    
    const person = new Person();
    person.name = req.body.name;
    person.age = req.body.age;
    person.power = req.body.power;
    person.description = req.body.description;

    person.save((error) => {
      if(error) {
        res.json({message: `Erro ao salvar o novo personagem - ${error}`});
      } else {
        res.json({message: 'Novo personagem, adicionado com sucesso'});
      }
    });
  })
  .get((req, res) => {
    Person.find((error, persons) => {
      if(error) {
        res.send('Erro ao tentar selecionar todos os personsagens:' + error);
      }else {
        res.json(persons);
      }
    });
  });

/*
  Find an member this marvel -> get/:id
  Update an member this marvel -> put/:id
*/

  router.route('/persons/:id')
  .get((req, res) => {
    Person.findById(req.params.id, (error, person) => {
      if(error) {
        res.send('Não foi possivél encontrar o personagem' + error);
      }else {
        res.json(person);
      }
    });
  })
  .put((req, res) => {
    Person.findById(req.params.id, (error, person) => {
      if(error) {
        res.send('Não foi possivél encontrar o personagem para atualizar' + error);
      }else {
        person.name = req.body.name;
        person.age = req.body.age;
        person.power = req.body.power;
        person.description = req.body.description;
        person.save((error) =>{
          if(error) {
            res.send(`Ops, ocorreu algum erro ao atualizar o personsagem. O erro do log é ${error}`);
          } else {
            res.json({message: 'Personsagem atualizado com sucesso!'});
          }
        });
      }
    });
  })
  .delete((req, res) => {
    Person.remove(
      { _id: req.params.id }, 
      function (error){
        if (error) {
          res.send(`Não foi possivél encontrar o personsagem para remoção + ${error}`);
        } else {
          res.json({ message: 'Personsagem removido'})
        }
      }
    );
  });

app.use('/api', router);

app.listen(port, (error) => {
  if(error) {
    console.log('Não foi possivel conectar no Servidor =(');
  } else {
    console.log(`App rodando em -> http://localhost:${port}`);
  }
});
