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


// URL base da API

let API_URL = 'https://ctd-todo-api.herokuapp.com/v1';


// Buscar dados do usuário

function buscarUsuario(tokenDoUsuario) {

    // Configurações da requisição GET.
    let configuracoesGET = {
        method: 'GET',
        headers: {
            'Authorization': `${tokenDoUsuario}`,
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


// Alterar dados do usuário

function alteraNomeUsuario(dadosUsuario) {
    // Seleciona o p no HTML
    let selectNome = document.getElementById('nomeUsuarioEmTarefas');

    // Guarda a informação do nome do usuário
    let nome = dadosUsuario.firstName;
    let sobrenome = dadosUsuario.lastName;

    selectNome.innerText = `${nome} ${sobrenome}`;
};