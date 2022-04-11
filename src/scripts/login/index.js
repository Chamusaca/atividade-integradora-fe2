let API_URL = 'https://ctd-todo-api.herokuapp.com/v1';
// Criar variáveis para puxar os valores
let campoUsuario = document.getElementById('inputEmail');
let campoSenha = document.getElementById('inputPassword');
let botaoAcessar = document.getElementById('botaoAcessar');


botaoAcessarLogin.addEventListener("click", function (evento) {

    const loginUsuario = {
        email: "",
        password: "",
    };
    
    //Atribui as informações e validadas no Objeto do usuário
    loginUsuario.email = campoUsuario.value;
    loginUsuario.password = campoSenha.value;

    let loginUsuarioEmJson = JSON.stringify(loginUsuario);

    let configuracoes = {
        method: 'POST',
        body: loginUsuarioEmJson,
        headers: {
        'Content-type': 'application/json',
        },
    }

    // Fetch para enviar informações pro servidor
    fetch(`${API_URL}/users/login`, configuracoes)
    .then((response) => {
        return response.json();}
    ).then((respostaEmJSON) => {
        return respostaEmJSON.jwt}
    );