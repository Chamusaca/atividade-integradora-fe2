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

setTimeout(() => {

    //Ordenando a lista de tarefas pendentes (A - Z)
    listaTarefasPendentes = listaTarefasPendentes.sort(function (a, b) {
        return a.description.localeCompare(b.description);
    });

    //Ordenando a lista de tarefas completas (A - Z)
    listaTarefasCompletas = listaTarefasCompletas.sort(function (a, b) {
        return a.description.localeCompare(b.description);
    });

    //Percorre a lista de tarefas pendentes (já ordenada) e as exibe em tela
    listaTarefasPendentes.map(tarefa => {
        renderizaTarefasPendentes(tarefa);
    });

    //Percorre a lista de tarefas terminadas (já ordenada) e as exibe em tela
    listaTarefasCompletas.map(tarefa => {
        renderizaTarefasConcluidas(tarefa);
    });
}, 2000);

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
    fetch(`${API_URL}/tasks/`, configGET)
        .then(respostaDoServidor => respostaDoServidor.json())
        .then(respostaDoServidorEmJSON => {
            console.log(respostaDoServidorEmJSON);
            const skeleton = document.querySelector('#skeleton');
        if (skeleton) {
            skeleton.remove();
        } 

        listarTarefas(respostaDoServidorEmJSON);
        botaoMudarEstato();
        otaoExcluirTarefa();

        })
        .catch(erro => console.log(erro));
}

// Botão para mudar o estado da tarefa
function botaoMudarEstato() {
    const btnMudarEstado = document.querySelectorAll('.change');

    btnMudarEstado.forEach(botao => {
      //para cada botão damos suas funcionalidades
      botao.addEventListener('click', function (event) {
        const id = event.target.id;
        const url = `${API_URL}/tasks/${id}`
        const payload = {};

        if (event.target.classList.contains('fa-undo-alt')) {
          payload.completed = false;
        } else {
          payload.completed = true;
        }

        const Settings = {
          method: 'PUT',
          headers: {
            "Authorization": tokenDoUsuario,
            "Content-type": "application/json"
          },
          body: JSON.stringify(payload)
        }
        fetch(url, Settings)
          .then(response => {
            console.log(response.status);
            //renderizar novamente as tarefas
            listarTodasAsTarefas(tokenDoUsuario);
          })
      })
    });

  }


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

//listar tarefas no DOM
function listarTarefas(lista) {
    const tarefasPendentes = document.querySelector('.tarefas-pendentes');
    tarefasPendentes.innerHTML = '';
    const tarefasConcluidas = document.querySelector('.tarefas-terminadas');
    tarefasConcluidas.innerHTML = '';

    lista.forEach(tarefa => {
        let terminada = new Date(tarefa.createdAt);
    if (tarefa.completed) {
        tarefasConcluidas.innerHTML += `
        <li class="tarefa">
            <div class="done"></div>
            <div class="descricao">
            <div class="nome">
            <div class="timestamp">
            <div>
                <button><i id="${tarefa.id}" class="fas fa-undo-alt change"></i></button>
                <button><i id="${tarefa.id}" class="fas fa-trash-alt delete"></i></button>
            </div>
                <p class="id">ID: ${tarefa.id}</p>            
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i>${terminada.toLocaleDateString()} <i class="far fa-clock"></i>${terminada.getHours()}:${terminada.getMinutes()}</p>
            </div>
        </li>
        `
    } else {
        tarefasPendentes.innerHTML += `
        <li class="tarefa">
            <div class="not-done change" id="${tarefa.id}"></div>
            <div class="descricao">
            <div class="nome">
            <div class="timestamp">
            <div>
                <p class="id">ID: ${tarefa.id}</p>       
                <p class="nome">${tarefa.description}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${terminada.toLocaleDateString()} <i class="far fa-clock"></i> ${terminada.getHours()}:${terminada.getMinutes()}</p>
            </div>
        </li>
        `
    }
});
}

// ------------------ FUNÇÕES PARA TAREFAS -------------------
// Criando uma nova tarefa
const tokenDoUsuario = localStorage.getItem("jsonRecebido");

const formCriarTarefa = document.querySelector('.nova-tarefa');
const novaTarefa = document.querySelector('#novaTarefa');

listarTodasAsTarefas(tokenDoUsuario);

formCriarTarefa.addEventListener('submit', function (evento) {
    evento.preventDefault();
    console.log('Criando nova tarefa');
    console.log(novaTarefa.value);
    
    const load = {
        description: novaTarefa.value.trim(),
    };

    let configPOST = {
        method: 'POST',
        body: JSON.stringify(load),
        headers: {
            authorization: tokenDoUsuario,
            'Content-Type': 'application/json',
        },
    };
    
    console.log("Criando uma tarefa na API");    
    fetch(`${API_URL}/tasks/`, configPOST)
        .then(respostaDoServidor => respostaDoServidor.json())
        .then(respostaDoServidorEmJSON => {
            console.log(respostaDoServidorEmJSON);
            listarTodasAsTarefas(tokenDoUsuario);
        })
        .catch(erro => console.log(erro));
        formCriarTarefa.reset();
        
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

// ------------------- FUNÇÕES PARA TAREFAS PENDENTES --------------------

let tarefasPendentesUl = document.querySelector(".tarefas-pendentes");

function renderizaTarefasPendentes(tarefaRecebida) {

    //Converte a data de TimeStamp Americano, para Date na formatação PT-BR
    var dataTarefa = new Date(tarefaRecebida.createdAt).toLocaleDateString("pt-BR")
 
    let liTarefaPendente = document.createElement('li');
    liTarefaPendente.classList.add("tarefa");
    //liTarefaPendente.setAttribute('class', 'tarefa'); //Outra maneira de setar a classe


    //Utilizando o "onclick"
    // <div class="not-done" id="${tarefaRecebida.id}" onclick="moverTarefaParaTerminada(${tarefaRecebida.id})"></div>
    liTarefaPendente.innerHTML =
        `
        <div class="not-done" id="${tarefaRecebida.id}"></div>
        <div class="descricao">
            <p class="nome">ID:${tarefaRecebida.id}</p>
            <p class="nome">${tarefaRecebida.description}</p>
            <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dataTarefa}</p>
        </div
    `
    //Adiciona a lista principal
    tarefasPendentesUl.appendChild(liTarefaPendente);
}
/* Função utilizada quando se opta pr usar o 'onclick' ao invez da captura pelo 'target' */
function moverTarefaParaTerminada(idTarefa) {
    let escolhaUsuario = confirm("Deseja realmente mover esta tarefa para as 'Tarefas Terminadas' ?");
    if (escolhaUsuario) {
        let cookieJwt = getCookie("jwt");
        //Invoca função de atualização, passando o uuid, o status e o tokenJWT
        atualizaTarefa(idTarefa, true, cookieJwt); // true -> A tarefa passa de "Pendente" para "Finalizada"
    }

}

//Captura toda a lista e verifica qual foi o elemento clicado (com o target)
tarefasPendentesUl.addEventListener('click', function (tarefaClicada) {
    tarefaClicada.preventDefault(); //Impede de atualizar a pagina
    let targetTarefa = tarefaClicada.target;

    if (targetTarefa.className == "not-done") { //Garante que seja clicado apenas na DIV a esqueda e não em qualquer lugar do card.
        let escolhaUsuario = confirm("Deseja realmente mover esta tarefa para as 'Tarefas Terminadas' ?");
        if (escolhaUsuario) {
            let cookieJwt = getCookie("jwt");
            //Invoca função de atualização, passando o uuid, o status e o tokenJWT
            atualizaTarefa(tarefaClicada.target.id, true, cookieJwt); // true -> A tarefa passa de "Pendente" para "Finalizada"
        }
    }
});

//Card que simboliza quando nenhuma tarefa foi encontrada na API
function nenhumaTarefaPendenteEncontrada() {
    let liTarefaPendente = document.createElement('li');
    liTarefaPendente.classList.add("tarefa");

    liTarefaPendente.innerHTML =
        `
        <div class="descricao">
            <p class="nome">Você ainda não possui nenhuma tarefa cadastrada no sistema</p>
        </div
    `
    //Adiciona a lista principal
    tarefasPendentesUl.appendChild(liTarefaPendente);
}