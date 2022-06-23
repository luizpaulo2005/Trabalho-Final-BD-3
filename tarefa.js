const {Pool} = require('pg');

const pool = new Pool ({
  connectionString:'postgres://rmpzmrtx:cT5DPQbsOloVtVVa6GIJ2n_hkbgZIIy3@motty.db.elephantsql.com/rmpzmrtx'
})

function recuperar(req, res) {
  console.log("Recuperando tarefas");
  
  pool.query('SELECT id, nome FROM tarefa ORDER BY id')
    .then(q => res.json({status: "ok", dados: q.rows}))
    .catch(err => res.json({status: "erro", msg: err}));
}

function inserir(req, res) {
  console.log("Inserindo tarefa " + req.body.nome);
  
  pool.query('INSERT INTO tarefa(nome) VALUES ($1)', [req.body.nome])
    .then(() => res.json({status: "ok"}) )
    .catch(err => res.json({status: "erro", msg: err}));
}

function remover(req, res) {
 console.log("Removendo tarefa " + req.params.id);
  
  pool.query('DELETE FROM tarefa WHERE id=$1', [req.params.id])
    .then(() => res.json({status: "ok"}))
    .catch(err => res.json({status: "erro", msg: err}));
}

module.exports = {
  recuperar,
  inserir,
  remover
}