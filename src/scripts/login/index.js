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
        return response.json();})
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
    let loginValidacao= document.getElementById("#loginValidacao");
    elementoSmallErro(loginValidacao);
    console.log("Erro ao logar");
    console.log(statusRecebido);

//Limpa o campo da senha ao errar o login
campoSenha.value = "";

console.log(statusRecebido);
if (statusRecebido == 400 || statusRecebido == 404) {
  console.log("Ocorreu algum erro, verifique o e-mail e/ou senha");
  loginValidacao.innerHTML = "Ocorreu algum erro, verifique o e-mail e/ou senha";
  loginApiValidacao = false;

     } else {
        loginApiValidacao = true;
        console.log("Login efetuado com sucesso");
        }
            validaTelaDeLogin()

    }
      
} else {
evento.preventDefault();
alert("Ambos campos devem ser preenchidos");
}
});

function resetaValidacaoLoginErro() {
loginValidacao.innerHTML == "";
botaoAcessarLogin.removeAttribute("disabled");
botaoAcessarLogin.innerText = "Acessar";
loginApiValidacao = true;
}

campoEmailLogin.addEventListener("blur", function () {
let inputEmailValidacao = document.getElementById("inputEmailValidacao");
campoEmailLogin.style.border = `1px solid #E42323BF`;

elementoSmallErro(inputEmailValidacao);

//Primeiro faz a validação simples de campo vazio
let emailEValido = validaEmailRecebido(campoEmailLogin.value);

//Se o e-mail não for válido e o campo não for vazio, depois essa mais complexa
if (!emailEValido && campoEmailLogin.value != "") {
inputEmailValidacao.innerText = "E-mail inválido";
emailValidacoesOk = false;

//Se o email não for válido e o campo for vazio
} else if (!emailEValido && campoEmailLogin.value == "") {
inputEmailValidacao.innerText = "Campo obrigatorio";
emailValidacoesOk = false;

//Senão.. ambos são válidos
} else {
inputEmailValidacao.innerText = "";
campoEmailLogin.style.border = ``;
emailValidacoesOk = true;
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