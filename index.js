const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const port = process.env.port || 3000;

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
