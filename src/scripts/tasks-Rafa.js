onload = () => {
    autenticarUsuario({
        email: 'rafa.qo@gmail.com',
        password: '12345'
    });


    // Criar a varíavel da URL base da API
    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    // Autenticar o usuário
    function autenticarUsuario(credenciais) {
        // Configurações da requisição POST.
        let configPOST = {
            method: 'POST',
            body: JSON.stringify(credenciais),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        // Requisição de autenticação do usuário.
        fetch(`${API_URL}/users/login`, configPOST)
            .then( (respServ) => {
                    
                // Retorno apenas dos dados convertidos em JSON.
                let promiseParaJSON = respServ.json();

                // Retorno da promessa convertida em JSON.
                return promiseParaJSON;
            })
            .then( (respostaEmJSON) => {
                
                // Capturando o retorno token JWT do Servidor.
                let jwtArmazenado = respostaEmJSON.jwt;

                localStorage.setItem('jwtArmazenado', jwtArmazenado);
            });
    };

    //Pedir dados do usuário
    

    // Criar as variáveis que selecionam os elementos necessários
    var entradaTarefa = document.getElementById('novaTarea');
    var radioButton = document.getElementById('not-done');
    var botaoCriarTarefa = document.getElementById('botaoTarefas');
    var botaoEncerrarSessao = document.getElementById('closeApp');
    var nomeUsuario = document.getElementById('nomeUsuarioEmTarefas');

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
    function criarTarefas(respostaDoServidor) {
        respostaDoServidor.map(function (corpoTarefa) {
            // Selecionar a id
            let selectID = corpoTarefa.id;
            
            // Selecionar a descrição
            let selectdescTarefa = corpoTarefa.description;

            // Selecionar o timestamp
            let selectTimeStamp = corpoTarefa.timestamp;

            // Selecionar o elemento do DOM que será o elemento pai
            tarefasPendentes.innerHTML += `
                <div class="not-done" id="${tarefaRecebida.id}"></div>
                <div class="descricao">
                    <p class="nome">ID:${tarefaRecebida.id}</p>
                    <p class="nome">${tarefaRecebida.description}</p>
                    <p class="timestamp"><i class="far fa-calendar-alt"></i> ${dataTarefa}</p>
                </div>
            `;
        })
    }
}