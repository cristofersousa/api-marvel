const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;
const mongoose = require('mongoose');

// data 
const PERSONS = require('./models/persons');

// connect mongoDB
// mongoose.connect('mongodb://localhost:marvel')

// connect with mlab
// mongodb://csp-marvel:672%40j179@ds147684.mlab.com:47684/marvel
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

router.get('/', (request, response) => {
  response.json({message: 'Hello Marvel or DC Comics?'});
});



app.use('/api', router);

app.listen(port, (error) => {
  if(error) {
    console.log('Não foi possivel conectar no Servidor =(');
  } else {
    console.log(`App rodando em -> http://localhost:${port}`);
  }
});
