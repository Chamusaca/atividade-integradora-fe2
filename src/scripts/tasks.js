// document.addEventListener('load', function () {
    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    //Criar as variáveis
    let campoNomeCadastro = document.getElementById("inputNomeCadastro");
    let campoSobrenomeCadastro = document.getElementById("inputSobrenomeCadastro");
    let campoEmailCadastro = document.getElementById("inputEmailCadastro");
    let campoSenhaCadastro = document.getElementById("inputSenhaCadastro");
    let campoRepetirSenhaCadastro = document.getElementById("inputRepetirSenhaCadastro");

    // Puxa os valores dos campos
    

    let configuracaoGET = {
        method: 'GET',
        body: objetoUsuarioCadastroJson,
        headers: {
            'Content-type': 'application/json',
            'authorization': 
        },
    };;

    var obterNomeUsuario = fetch(`${API_URL}/users/getMe`, configuracaoGET)
        .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            return respostaDoServidor.json();
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
    );

    var listarTodasTarefas = fetch(`${API_URL}/tasks`)
        .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            return respostaDoServidor.json();
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
    );

    var obterUmaTarefa = fetch(`${API_URL}/tasks/${id}`)
        .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            return respostaDoServidor;
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
    );

    var criarNovaTarefa = fetch(`${API_URL}/tasks`, {
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
    );

    var atualizarTarefa = fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            description: "string",
            completed: false
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        }
        ).then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            respostaDoServidor.json();
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
    );
    

    var deletarTarefa = fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        })
        .then(respostaDoServidor => {
            // console.log(respostaDoServidor);
            return respostaDoServidor;
        }
    );

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
    
    
// })

        