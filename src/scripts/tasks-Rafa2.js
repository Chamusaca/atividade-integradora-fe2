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