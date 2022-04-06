document.addEventListener('load', function () {
    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    var obterNomeUsuario = fetch(`${API_URL}/users/getMe`)
    .then(resultado => {
        // Primeira resposta do servidor. 
        return resultado.json();
    }
    ).then(resultado => {
        // Resposta do resultado da resposta no formato JSON.
        resultadoEmJSON(resultado);
    }
    ).catch(
        erros => {
            console.log(erros);
        }
    );

    var listarTodasTarefas = fetch(`${API_URL}/tasks`)
    .then(resultado => {
        // Primeira resposta do servidor.
        return resultado.json();
    }
    ).then(resultado => {
        // Resposta do resultado da resposta no formato JSON.
        resultadoEmJSON(resultado);    
    }
    ).catch(
        erros => {
            console.log(erros);
        }
    );


    
})

        // let nome = document.getElementsByClassName("user-info");
        // nome[0].createTextNode(nomeUsuario);
        // p.appendChild.nome