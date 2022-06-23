let tarefas = []; // tuplas id / nome

function inserir_tarefa() {
  let entrada = document.getElementById('entrada_tarefa');
  let tarefa = entrada.value;
  tarefas.push([tarefas.length + 1, tarefa]);

  fetch('tarefa/', {method: 'POST', body: tarefa})
    .then( () => mostrar_tarefas() );
}

function remover_tarefa(id) {
  for(let i = 0; i < tarefas.length; i++) {
    if(tarefas[i][0] == id) {
      tarefas.splice(i, 1);
      break;
    }
  }

  fetch('tarefa/' + id, {method: 'DELETE'})
    .then( () => mostrar_tarefas() );
}

function mostrar_tarefas() {
  fetch('tarefa/').then((resp) => {
    let lista = document.getElementById('lista_tarefas');
    lista.innerHTML = '';

    for(let tarefa of tarefas) {
      let item = document.createElement("li");
      item.className="list-group-item col-auto";
      let texto = document.createTextNode(tarefa[1] + ' - ');
      let botao = document.createElement("button");
      botao.innerText = 'X';
      botao.onclick = () => remover_tarefa(tarefa[0]);
      botao.className= "btn btn-primary";
        
      item.appendChild(texto);
      item.appendChild(botao);
      lista.appendChild(item);
    }
  })
}