onload = () => {

    var API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

    var obterNomeUsuario = fetch(API_URL)
    .then(respostaDoServidor => {
        // Primeira resposta do servidor. 
        return respostaDoServidor.json();
    })
    .then(nomeUsuario => {

        // Resposta do resultado da resposta no formato JSON.
        nomeUsuario = respostaDoServidor.GET("email");
        return nomeUsuario;

    });


};

 