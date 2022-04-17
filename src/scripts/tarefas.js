// Autenticação do usuário
onload = () => {
    const tokenDoUsuario = localStorage.getItem("jsonRecebido");

    if (tokenDoUsuario == "" || tokenDoUsuario == null || tokenDoUsuario == undefined) {
        alert("Você não tem permissão para acessar essa página.");
        window.location = "./index.html";
    }
    else {
        console.log(tokenDoUsuario);
        buscarUsuario(tokenDoUsuario);
        listarTodasAsTarefas(tokenDoUsuario);
    }
}

// ------------------ FUNÇÕES PARA COMUNICAÇÃO COM O SERVIDOR ------------------

// URL base da API
let API_URL = 'https://ctd-todo-api.herokuapp.com/v1';


// REQUISIÇÃO GET - Buscar dados do usuário
function buscarUsuario(tokenDoUsuario) {

    // Configurações da requisição GET.
    let configuracoesGET = {
        method: 'GET',
        headers: {
            'authorization': `${tokenDoUsuario}`,
        },
    }

    // Requisição para retorno dos dados de cadastro do usuário.
    fetch(`${API_URL}/users/getMe/`, configuracoesGET)
        .then((respostaDoServidor) => {

            // Retorno apenas dos dados convertidos em JSON.
            let JSON = respostaDoServidor.json();

            // Retorno da promessa convertida em JSON.
            return JSON;
        })
        .then((respostaDoServidorEmJSON) => {

            // Apresentando resultado final no console.log().
            console.log(`Dados do Usuário: ${JSON.stringify(respostaDoServidorEmJSON)}`);
            alteraNomeUsuario(respostaDoServidorEmJSON);

        })
        .catch(erro => {
            console.log("Usuário não encontrado.")
            console.log(erro);
        });
}


// REQUISIÇÃO GET - Listar todas as tarefas
function listarTodasAsTarefas(tokenDoUsuario) {
    let configGET = {
        method: 'GET',
        headers: {
            authorization: tokenDoUsuario
        }
    };
    console.log("consultando minhas tarefas");
    fetch(`${API_URL}/tasks`, configGET)
    .then(response => response.json())
    .then(tarefas => {
        console.log(tarefas);
    }
    
    ).then(
        resultado => {
            manipulandoTarefasUsuario(resultado);
        }
    ).catch(
        erros => {
            console.log(erros);
        }
    );
    const skeleton = document.querySelector('#skeleton');
    if(skeleton) {
        skeleton.remove();
    }
}

// REQUISIÇÃO POST - Enviar informações de criar nova tarefa
function enviarTarefaParaOServ(tokenDoUsuario) {
    let configPOST = {
        method: 'POST',
        body: objetoTarefaJson,
        headers: {
            'Content-type': 'application/json', //responsável elo json no Body
            'authorization': `${tokenDoUsuario}`
        },
    }

    fetch(`${API_URL}/tasks`, configPOST)
    .then(
        resultado => {
            return resultado.json();
        })
    .then(
        resultado => {
            criarTarefaDOM(resultado);
        })
    .catch(
        erros => {
            console.log(erros);
        }
    );
};

// REQUISIÇÃO PUT - Atualizar informações de criar nova tarefa
function atualizaTarefa(idTarefa, status, tokenDoUsuario) {

    let configPUT = {
        method: 'PUT',
        body: JSON.stringify(
            {
                completed: status
            }
        ),
        headers: {
            // Preciso passar ambas propriedade pro Headers da requisição
            'Content-type': 'application/json', //responsável elo json no Body
            'Authorization': `${tokenDoUsuario}`
        },
    }

    //Chamar a API
    fetch(`${API_URL}/tasks/${idTarefa}`, configPUT)
        .then( response => {
                return response.json()
            })
        .then(function () {
            alert("A tarefa foi atualizada com sucesso!")
            //Recarrega a página para atualizar a lista com a "nova" tarefa cadastrada
            window.location.reload();
        })
        .catch(error => {
            loginErro(error)
        });
}

/// REQUISIÇÃO DELETE - Deletar uma tarefa
function deletarTarefa(idTarefa, tokenDoUsuario) {

    let configDELETE = {
        method: 'DELETE',
        headers: {
            'Authorization': tokenDoUsuario
        },
    }

    //@@@Chamando a API
    fetch(`${API_URL}tasks/${idTarefa}`, configDELETE)
        .then(response => {
            return response.json();
        })
        .then( function () {
            alert("A tarefa foi deletada com sucesso!")
            //Recarrega a página para atualiza a lista com a "nova" tarefa cadastrada
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
        });
}

// ------------------ FUNÇÕES PARA MANIPULAÇÃO DO DOM ------------------

// Alterar dados do usuário

function alteraNomeUsuario(dadosUsuario) {
    // Seleciona o p no HTML
    let selectNome = document.getElementById('nomeUsuarioEmTarefas');

    // Guarda a informação do nome do usuário
    let nome = dadosUsuario.firstName;
    let sobrenome = dadosUsuario.lastName;

    selectNome.innerText = `${nome} ${sobrenome}`;
};

// Encerrar a sessão
let botaoEncerrarSessao = document.querySelector('#closeApp');

botaoEncerrarSessao.addEventListener('click', evento => {
    function encerrarSessao() {
        let escolhaUsuario = confirm(`Deseja realmente finalizar a sessão?`);
        if (escolhaUsuario) {
            //Direciona para a tela de login
            window.location = "index.html";
            localStorage.clear();
        }
    }
    encerrarSessao(evento);
});

// ------------------ FUNÇÕES PARA TAREFAS PENDENTES -------------------

let tarefasPendentesUl = document.querySelector(".tarefas-pendentes");

// Listar todas as tarefas

function manipulandoTarefasUsuario(listaDeTarefas) {
    //Se a lista de tarefas retornar vazia da api...
    listaDeTarefas.map(tarefa => {
        if (tarefa.completed) {
            renderizaTarefasConcluidas(tarefa);
        } else {
            renderizaTarefasPendentes(tarefa);
        }
    });

};

function criarTarefaDOM(respostaDoServidorEmJSON) {

    const tarefasPendentes = document.querySelector('.tarefas-pendentes');
      tarefasPendentes.innerHTML = "";
      const tarefasTerminadas = document.querySelector('.tarefas-terminadas');
      tarefasTerminadas.innerHTML = "";
  
      respostaDoServidorEmJSON.forEach(tarefa => {
        //variable intermedia para manipular la fecha
        let fecha = new Date(tarefa.createdAt);
  
        if (tarefa.completed) {
          //lo mandamos al listado de tareas incompletas
          tarefasTerminadas.innerHTML += `
                          <li class="tarefa">
                              <div class="done"></div>
                              <div class="descricao">
                              <div>
                                  <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
                                  <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
                              </div>
                                  <p class="nombre">${tarefa.description}</p>
                                  <p class="timestamp"><i class="far fa-calendar-alt"></i>${fecha.toLocaleDateString()} <i class="far fa-clock"></i>${fecha.getHours()}:${fecha.getMinutes()}</p>
                              </div>
                          </li>
                          `
        } else {
          //lo mandamos al listado de tareas terminadas
          tarefasPendentes.innerHTML += `
                          <li class="tarea">
                              <div class="not-done change" id="${tarefa.id}"></div>
                              <div class="descricao">
                                  <p class="nombre">${tarefa.description}</p>
                                  <p class="timestamp"><i class="far fa-calendar-alt"></i>${fecha.toLocaleDateString()} <i class="far fa-clock"></i>${fecha.getHours()}:${fecha.getMinutes()}</p>
                              </div>
                          </li>
                          `
        }
      });
    };

//     let desc = respostaDoServidorEmJSON.description;
//     let id = respostaDoServidorEmJSON.id;
//     let timestamp = new Date(respostaDoServidorEmJSON.createdAt).toLocaleDateString("pt-BR");
//     if (tarefa.completed){
    
//     let liTarefaPendente = document.createElement('li');
//     liTarefaPendente.classList.add("tarefa");
//     liTarefaPendente.innerHTML += `
//         <div class="not-done" id="selectButton"></div>
//         <div class="descricao">
//             <p class="nome">ID:${id}</p>
//             <p class="nome">${desc}</p>
//             <p class="timestamp"><i class="far fa-calendar-alt"></i> ${timestamp}</p>
//         </div>
//     `;
//         } else {
//             let liTarefaConcluida = document.createElement('li');
//             liTarefaConcluida.classList.add("tarefa");
//             liTarefaConcluida.innerHTML += `
//                 <div class="done" id="selectButton"></div>
//                 <div class="descricao">
//                     <p class="nome">ID:${id}</p>
//                     <p class="nome">${desc}</p>
//                     <p class="timestamp"><i class="far fa-calendar-alt"></i> ${timestamp}</p>
//                 </div>
//             `;
    
//             tarefasPendentesUl.appendChild(tarefasPendentesUl);
           
//     }
// };

// Enviar uma tarefa nova
let botaoCadastrar = document.getElementById("botaoTarefas");

botaoCadastrar.addEventListener('click', evento => {
    evento.preventDefault();

    let descricaoTarefa = document.getElementById('novaTarefa');
    let radioGrupo = document.getElementsByName('grupoRadio');
    let radioSelecionado;
    //Verifica qual foi o radio selecionado e armazena em uma variável
    radioGrupo.forEach(radio => radioSelecionado = radio.checked);

    //Cria objeto JS que será convertido para JSON
    const objetoTarefa = {
        description: descricaoTarefa.value,
        completed: radioSelecionado
    }

    let objetoTarefaJson = JSON.stringify(objetoTarefa);

    enviarTarefaParaOServ(objetoTarefaJson);

    });

//Captura toda a lista e verifica qual foi o elemento clicado (com o target)
tarefasPendentesUl.addEventListener('click', function (tarefaClicada) {

    // tarefaClicada.preventDefault(); //Impede de atualizar a pagina
    let targetTarefa = tarefaClicada.target;

    if (targetTarefa.className == "not-done") { //Garante que seja clicado apenas na DIV a esqueda e não em qualquer lugar do card.
        //Invoca função de atualização, passando o uuid, o status e o tokenJWT
        atualizaTarefa(tarefaClicada.target.id, true, `${tokenDoUsuario}`); // true -> A tarefa passa de "Pendente" para "Finalizada"
    }
});

//Card que simboliza nenhuma tarefa pendente cadastrada na API
function nenhumaTarefaPendenteEncontrada() {
    let liTarefaPendente = document.createElement('li');
    liTarefaPendente.classList.add("tarefa");

    liTarefaPendente.innerHTML =
        `
        <div class="descricao">
            <p class="nome">Você ainda não possui nenhuma tarefa cadastrada em nosso sistema</p>
        </div
    `
    //Adiciona a lista principal
    tarefasPendentesUl.appendChild(liTarefaPendente);
}


// ------------------- FUNÇÕES PARA TAREFAS CONCLUÍDAS --------------------

let tarefasTerminadasUl = document.querySelector(".tarefas-terminadas");

function renderizaTarefasConcluidas(tarefaRecebida) {
    let liTarefaTerminada = document.createElement('li');
    liTarefaTerminada.classList.add("tarefa");
    //liTarefaPendente.setAttribute('class', 'tarefa'); //Também é possível

    liTarefaTerminada.innerHTML =
        `
        <div class="done"></div>
        <div class="descricao">
            <p class="nome">${tarefaRecebida.description}</p>
            <div>
                <button><i id="${tarefaRecebida.id}" class="fas fa-undo-alt change"></i></button>
                <button><i id="${tarefaRecebida.id}" class="far fa-trash-alt"></i></button>
            </div>
        </div>
    `
    //Adiciona a lista principal
    tarefasTerminadasUl.appendChild(liTarefaTerminada);
}

//Captura toda a lista e verifica qual foi o elemento clicado (com o target)
tarefasTerminadasUl.addEventListener('click', function (tarefaClicada) {
    tarefaClicada.preventDefault(); //Impede de atualizar a pagina
    let targetTarefa = tarefaClicada.target;

    //Trocar o status da atividade para "pendente"
    if (targetTarefa.className == "fas fa-undo-alt change") {
        let escolhaUsuario = confirm("Deseja realmente voltar esta tarefa para as 'Tarefas Pendentes' ?");
        if (escolhaUsuario) {
            atualizaTarefa(tarefaClicada.target.id, false, tokenDoUsuario); // true -> A tarefa passa de "Pendente" para "Finalizada"
        }
    }

    //Deletar uma tarefa por seu uuid
    if (targetTarefa.className == "far fa-trash-alt") {

        let escolhaUsuario = confirm("Deseja realmente deletar esta tarefa ?");
        if (escolhaUsuario) {
            deletarTarefa(tarefaClicada.target.id, tokenDoUsuario);
        }
    }
});