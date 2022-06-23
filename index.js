const express = require('express')
const bodyParser = require('body-parser');

const tarefa = require('./tarefa.js');

const app = express();
const port = 5000;

app.use('/', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/tarefa', tarefa.recuperar);
app.post('/tarefa', tarefa.inserir);
app.delete('/tarefa/:id', tarefa.remover);

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`)
})
