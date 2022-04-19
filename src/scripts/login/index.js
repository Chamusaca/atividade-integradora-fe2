// Variável para a URL base 
let API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

// Criar variáveis para puxar os valores
let campoUsuario = document.getElementById('inputEmail');
let campoSenha = document.getElementById('inputPassword');
let botaoAcessar = document.getElementById('botaoAcessar');

//Desabilita o botão de entrada ao iniciar a página
botaoAcessar.setAttribute("disabled", true);
botaoAcessar.innerText = "Bloqueado";

let emailValidacoesOk = false;
let senhaValidacoesOk = false;

//API
let loginApiValidacao = true;


// Definir o evento de enviar as informações quando clicar no botão
botaoAcessar.addEventListener("click", function (evento) {

    evento.preventDefault();

    const loginUsuario = {
        email: "",
        password: "",
    };
    
    //Atribui as informações e valida no Objeto do usuário
    loginUsuario.email = campoUsuario.value;
    loginUsuario.password = campoSenha.value;

    let loginUsuarioEmJson = JSON.stringify(loginUsuario);

    let configuracoesPOST = {
        method: 'POST',
        body: loginUsuarioEmJson,
        headers: {
            'Content-type': 'application/json',
        },
    }

    // Fetch para enviar informações pro servidor
    fetch(`${API_URL}/users/login`, configuracoesPOST)
    .then((response) => {
        if (response.status == 201){
            return response.json();
        }
        throw response;
        })
    .then((respostaEmJSON) => {
        console.log(respostaEmJSON);
        loginSucesso(respostaEmJSON.jwt);
        localStorage.setItem('jsonRecebido', respostaEmJSON.jwt);    
    })
    .catch((erro) => {
        loginErro(erro.status)
    });

function loginSucesso(jsonRecebido) {
    console.log("Json validado");
    console.log(jsonRecebido);
    //Direciona o usuário para a tela de tarefas após sucesso ao logar
    window.location = "tarefas.html";
}

function loginErro(statusRecebido) {
    
    alert("Erro ao logar, email e/ou senha incorretos");

}

validaTelaDeLogin();
});

campoSenhaLogin.addEventListener("blur", function () {
let inputPasswordValidacao = document.getElementById(
"inputPasswordValidacao"
);
campoSenhaLogin.style.border = `1px solid #E42323BF`;
elementoSmallErro(inputPasswordValidacao);

if (campoSenhaLogin.value == "") {
inputPasswordValidacao.innerText = "Campo obrigatorio";
senhaValidacoesOk = false;
} else {
inputPasswordValidacao.innerText = "";
campoSenhaLogin.style.border = ``;
senhaValidacoesOk = true;
}

resetaValidacaoLoginErro();
validaTelaDeLogin();
});

function validaTelaDeLogin() {
//Se ambos algum dos campos não forem válido
if (!emailValidacoesOk || !senhaValidacoesOk || !loginApiValidacao) {
botaoAcessarLogin.setAttribute("disabled", true);
botaoAcessarLogin.innerText = "Bloqueado";
return false;
//Se ambos forem válidos
} else {
botaoAcessarLogin.removeAttribute("disabled");
botaoAcessarLogin.innerText = "Acessar";
return true;
}
};