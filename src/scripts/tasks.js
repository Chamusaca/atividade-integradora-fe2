// document.addEventListener('load', function () {
    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    //Criar as variáveis para guardar informações dos inputs
    let campoNovaTarefa = document.getElementById('novaTarea');

    function validarCredenciaisDoUsuario(eventoDoFormulario) {

        // Para não atualizar a página.
        eventoDoFormulario.preventDefault();
    
        // Destruturando/Separando os campos e-mail e senha do formulário.
        let [email, senha] = eventoDoFormulario.target;
    
        // Armazena e-mail e senha em variáveis.
        let emailDoUsuario = email.value;
        let senhaDoUsuario = senha.value;
    
        // Cria um objeto contendo as credenciais do usuário.
        let credenciaisDoUsuario = {
            email: emailDoUsuario,
            password: senhaDoUsuario
        }
    
        // Requisição de autenticação do usuário.
        autenticarUsuario(credenciaisDoUsuario);
    
    }
    
    function alteraDadosUsuarioEmTela(objetoUsuarioRecebido) {
        let nomeUsuarioEmTarefas = document.getElementById('nomeUsuarioEmTarefas');
        nomeUsuarioEmTarefas.innerText = `${objetoUsuarioRecebido.firstName} ${objetoUsuarioRecebido.lastName}`;
    }

    function autenticarUsuario(credenciaisDoUsuario) {

        // Configurações da requisição POST.
        let configuracoesPOST = {
            method: 'POST',
            body: JSON.stringify(credenciaisDoUsuario),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    
        // Requisição de autenticação do usuário.
        fetch(`${URL_API}/users/login/`, configuracoesPOST)
            .then(function (respostaDoServidor) {
                    
                // Retorno apenas dos dados convertidos em JSON.
                let JSON = respostaDoServidor.json();
    
                // Retorno da promessa convertida em JSON.
                return JSON;
            })
            .then(function (respostaDoServidorEmJSON) {
                
                // Capturando o retorno token JWT do Servidor.
                let tokenDoUsuario = respostaDoServidorEmJSON.jwt;
    
                // Requisição dos dados de cadastro do Usuário.
                pedirInformacoesDoUsuario(tokenDoUsuario);
    
                // Apresentando resultado final no console.log().
                console.log(`POST autenticarUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);
    
            });
    }
    
    

    function pedirInformacoesDoUsuario(tokenDoUsuario) {

        // Configurações da requisição GET.
        let configuracoesGET = {
            method: 'GET',
            headers: {
                'authorization': tokenDoUsuario
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
                console.log(`GET pedirInformacoesDoUsuario() ${JSON.stringify(respostaDoServidorEmJSON)}`);
    
            });
    
    }

    function listarTodasTarefas(tokenDoUsuario) {

        let configuracoesGET = {
            method: 'GET',
            headers: {
                'authorization': tokenDoUsuario
            },
        }

        fetch(`${API_URL}/tasks`, configuracoesGET)
        .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            return respostaDoServidor.json();
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
        );
    }

    function obterUmaTarefa(tokenDoUsuario) {

        let configuracoesGET = {
            method: 'GET',
            headers: {
                'authorization': tokenDoUsuario
            },
        }

        fetch(`${API_URL}/tasks/${id}`, configuracoesGET)
        .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            return respostaDoServidor;
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
        )
    };

    function criarNovaTarefa(tarefa) {

        tarefa = campoNovaTarefa.value;

    
        fetch(`${API_URL}/tasks`, {
            method: 'POST',
            body: JSON.stringify({
                description: 'string',
                completed: false,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            respostaDoServidor.json();
            })
            .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
            .catch(erros => {console.log(erros);}
        )
    };

    function atualizarTarefa(tarefa) {
        fetch(`${API_URL}/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                description: "string",
                completed: false
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then(respostaDoServidor => {
                // console.log(respostaDoServidor);
                respostaDoServidor.json();
            })
            .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
            .catch(erros => {console.log(erros);}
        )
    };
    

    function deletarTarefa () {
        fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            })
            .then(respostaDoServidor => {
                // console.log(respostaDoServidor);
                return respostaDoServidor;
            }
        )
    };

    var construirTarefa = function (desc, timestamp) {

        // Seleciona a tarefa <div class="descricao".
        var selectdescTarefa = document.querySelector('.descricao');
        
        // Cria os elementos <p>.
        var criarPTarefa = document.createElement('p');
        var criarPTimestamp = document.createElement('p');
    
        // Seleciona o texto do input das descrição e armazena para usar na criação da tarefa.
        desc = document.getElementById('novaTarea').value;
        var valorTimestamp = timestamp;

        // Criar os nodes de texto e de timestamp
        var criarTarefa = document.createTextNode(desc);
        var criarTimestamp = document.createTextNode(valorTimestamp);
        
        // Adiciona a descrição ao div.
        selectdescTarefa.appendChild.criarPTarefa;
        criarPTarefa.appendChild.criarTarefa;

        // Adiciona o timestamp ao div
        selectdescTarefa.appendChild.criarPTimestamp;
        criarPTimestamp.appendChild.criarTimestamp;

    };
    // Encerra Sessão.
    function encerrarSessao() {
        let escolhaUsuario = confirm("Deseja realmente finalizar a sessão e voltar para o login ?");
        if (escolhaUsuario == true) {
            window.location.href = "index.html";
            // Limpa o localStorage.
        localStorage.clear();
        }
    }
    
    
// })

        