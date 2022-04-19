// Autenticação do usuário
onload = () => {
    const tokenDoUsuario = sessionStorage.getItem("jwt");

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


/*------------------ FUNÇÕES PARA COMUNICAÇÃO COM O SERVIDOR ------------------*/

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
        botaoMudarEstado();
        botaoDeletarTarefa();

        })
        .catch(erro => console.log(erro));
}

/* ----------------------------REQUISIÇÃO PUT - Alterar estado da tarefa---------------------------- */
// Botão para mudar o estado da tarefa para não concluída
function botaoMudarEstado() {
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


/* --------------------------FUNÇÕES PARA TAREFAS --------------------------------*/
// Criando uma nova tarefa
const tokenDoUsuario = sessionStorage.getItem("jwt");

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

  /* ---------------------------------Botão DELETE ----------------------------------------- */
  // Botão para deletar tarefa
    function botaoDeletarTarefa() {
    const btnDeletarTarefa = document.querySelectorAll('.fa-trash-alt');

    btnDeletarTarefa.forEach(botao => {
      //a cada boton le asignamos una funcionalidad
      botao.addEventListener('click', function (event) {
        const id = event.target.id;
        const url = `${API_URL}/tasks/${id}`

        const settings = {
          method: 'DELETE',
          headers: {
            "Authorization": tokenDoUsuario,
          }
        }
        fetch(url, settings)
          .then(response => {
            console.log(response.status);
            //renderizar novamente as tarefas
            listarTodasAsTarefas(tokenDoUsuario);
            })
            .catch(error => console.log(error));
        });
    });
    }

/*------------------ FUNÇÕES PARA MANIPULAÇÃO DO DOM ------------------*/

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
            sessionStorage.clear();
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
                <div class="descricao">
                    <p class="id">ID: ${tarefa.id}</p>
                    <p class="nome">${tarefa.description}</p>
                    <div>
                        <button><i id="${tarefa.id}" class="fas fa-undo-alt"></i></button>
                        <button><i id="${tarefa.id}" class="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </li>
            `
        } else {
            tarefasPendentes.innerHTML += `
            <li class="tarefa">
                <div class="not-done" id="${tarefa.id}"></div>
                <div class="descricao">
                    <p class="id">ID: ${tarefa.id}</p>       
                    <p class="nome">${tarefa.description}</p>
                    <p class="timestamp"><i class="far fa-calendar-alt"></i> ${terminada.toLocaleDateString()} <i class="far fa-clock"></i> ${terminada.getHours()}:${terminada.getMinutes()}</p>
                </div>
            </li>
            `
        }
});
}