onload = () => {
    let jwtRecebido = localStorage.getItem('jsonRecebido');
    
    console.log(jwtRecebido);

    // Criar a varíavel da URL base da API
    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    //Pedir dados do usuário
    function pegarInfosAPI(dados) {
        let configGET = {
            headers: {
                'authorization': jwtRecebido
            },
        }

        fetch(`${API_URL}/users/getMe`, configGET)
        .then(respServidor => {

            let respServidorJSON = respServidor.json();
            return respServidorJSON;

        }).then(respJSON => {

            let pegarDados = respJSON;
            
            alteraNomeUsuario(pegarDados);
        })
    };

    pegarInfosAPI();


    // Criar as variáveis que selecionam os elementos necessários
    var entradaTarefa = document.getElementById('novaTarefa');
    var radioButton = document.getElementById('not-done');
    var botaoCriarTarefa = document.getElementById('botaoTarefas');
    var botaoEncerrarSessao = document.getElementById('closeApp');

    // Encerrar a sessão
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


    function alteraNomeUsuario(nomeUsuario) {
        // Seleciona o p no HTML
        selectNome = document.getElementById('nomeUsuarioEmTarefas');

        // Guarda a informação do nome do usuário
        let nome = nomeUsuario.name;
        let sobrenome = nomeUsuario.lastname;

        selectNome.innerText = `${nome} ${sobrenome}`;
    };


    // Criar lista de tarefas
    botaoCriarTarefa.addEventListener('click', function (respostaDoServidor) {

        respostaDoServidor.preventDefault();

        respostaDoServidor.map(function (corpoTarefa) {
            // Selecionar a id
            let selectID = corpoTarefa.id;
            
            // Selecionar a descrição
            let selectdescTarefa = corpoTarefa.description;

            // Selecionar o timestamp
            let selectTimeStamp = corpoTarefa.timestamp;

            // Selecionar o elemento do DOM que será o elemento pai
            let lista = document.querySelector('.tarefas-pendentes');


            tarefasPendentes.innerHTML += `
                <div class="not-done" id=""></div>
                <div class="descricao">
                    <p class="nome">ID:${tarefaRecebida.id}</p>
                    <p class="nome">${tarefaRecebida.description}</p>
                    <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dataTarefa}</p>
                </div>
            `;
        });
    });
}




// Funções tarefas que eu criei 
let tarefasPendentesUl = document.querySelector(".tarefas-pendentes");

// let selecionaElementoPai = document.querySelector('#skeleton');

function criarTarefaDOM(respostaDoServidorEmJSON) {

    let desc = tarefas.description;
    let id = tarefas.id;
    let timestamp = new Date(tarefas.createdAt).toLocaleDateString("pt-BR");
    
    let liTarefaPendente = document.createElement('li');
    liTarefaPendente.classList.add("tarefa");
    liTarefaPendente.innerHTML += `
    <div class="not-done" id="selectButton"></div>
    <div class="descricao">
        <p class="nome">ID:${id}</p>
        <p class="nome">${desc}</p>
        <p class="timestamp"><i class="far fa-calendar-alt"></i> ${timestamp}</p>
    </div>
    `;
    

    tarefasPendentesUl.appendChild(liTarefaPendente);

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
            atualizaTarefa(tarefaClicada.target.id, true, tokenDoUsuario); // true -> A tarefa passa de "Pendente" para "Finalizada"
        }
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