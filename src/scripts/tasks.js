// document.addEventListener('load', function () {
    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    var obterNomeUsuario = fetch(`${API_URL}/users/getMe`)
        .then(respostaDoServidor => {
            console.log(respostaDoServidor);
            return respostaDoServidor.json();
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
    );

    var listarTodasTarefas = fetch(`${API_URL}/tasks`)
        .then(respostaDoServidor => {
            // Primeira resposta do servidor.
            return respostaDoServidor.json();
        })
        .then(respostaDoServidorJSON => {return respostaDoServidorJSON;})
        .catch(erros => {console.log(erros);}
    );

    var obterTarefa = fetch(`${API_URL}/tasks/${id}`)
        .then(respostaDoServidor => {return respostaDoServidor;})
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
        .then(respostaDoServidor => {respostaDoServidor.json();})
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
        ).then(respostaDoServidor => {respostaDoServidor.json();}
        ).then(respostaDoServidorJSON => {return respostaDoServidorJSON;}
        ).catch(erros => {console.log(erros);}
    );
    

    var deletarTarefa = fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
        })
        .then(respostaDoServidor => {
            return respostaDoServidor;
        }
    );
    

    
// })

        // let nome = document.getElementsByClassName("user-info");
        // nome[0].createTextNode(nomeUsuario);
        // p.appendChild.nome