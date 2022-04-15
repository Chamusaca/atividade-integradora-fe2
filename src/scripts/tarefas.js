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
    }
}

// ------------------ FUNÇÕES PARA COMUNICAÇÃO COM O SERVIDOR ------------------

// URL base da API
let API_URL = 'https://ctd-todo-api.herokuapp.com/v1';


// Buscar dados do usuário

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
        'authorization': `${tokenDoUsuario}`,
    }

    fetch(`${API_URL}/tasks`, configGET)
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
}

// REQUISIÇÃO POST - Enviar informações de criar nova tarefa

function enviarTarefaParaOServ(tokenDoUsuario) {
    let configPOST = {
        method: 'POST',
        body: 'objetoTarefaJson',
        headers: {
            'Content-type': 'application/json', //responsável elo json no Body
            'authorization': `${tokenDoUsuario}` //responsável pela autorização (vem do cookie)
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
        let escolhaUsuario = confirm("Deseja realmente finalizar a sessão e voltar para o login ?");
        if (escolhaUsuario) {
            //Direciona para a tela de login
            window.location = "index.html";
            localStorage.clear();
        }
    }
    encerrarSessao(evento);
});

// Função para criar elemento DOM da tarefa

function criarTarefaDOM(respostaDoServidorEmJSON) {
    respostaDoServidorEmJSON.map(function(tarefas){

        let desc = tarefas.description;
        let id = tarefas.id;
        let timestamp = new Date(tarefas.createdAt).toLocaleDateString("pt-BR");

        let selecionaElementoPai = document.querySelector('#skeleton');

        let tarefaCriada = tarefas.innerHTML += `
        <li class="tarefa">
            <div class="not-done" id="selectButton"></div>
            <div class="descricao">
                <p class="nome">ID:${id}</p>
                <p class="nome">${desc}</p>
                <p class="timestamp"><i class="far fa-calendar-alt"></i> ${timestamp}</p>
            </div>
        </li>
        `;
    })

    selecionaElementoPai.appendChild(tarefaCriada);

}
