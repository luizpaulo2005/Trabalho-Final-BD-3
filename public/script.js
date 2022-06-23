let tarefas = [];

function inserir_tarefa() {
  let entrada = document.getElementById('entrada_tarefa');
  let tarefa = entrada.value;
  
  fetch('tarefa/', {
    method: 'POST',
    body: JSON.stringify({nome: tarefa}),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }).then( resp => {
      mostrar_tarefas();
  });
}

function remover_tarefa(id) {
  fetch('tarefa/' + id, {method: 'DELETE'})
    .then( () => mostrar_tarefas() );
}

function mostrar_tarefas() {
  fetch('tarefa/')
    .then(resp => resp.json())
    .then(resp => {
      tarefas = resp.dados;
      
      let lista = document.getElementById('lista_tarefas');
      lista.innerHTML = '';
  
      for(let tarefa of tarefas) {
        let item = document.createElement("li");
        let texto = document.createTextNode(tarefa.nome + ' - ');
        let botao = document.createElement("button");
        botao.innerText = 'X';
        botao.onclick = () => remover_tarefa(tarefa.id);
          
        item.appendChild(texto);
        item.appendChild(botao);
        lista.appendChild(item);
      }
  });
}