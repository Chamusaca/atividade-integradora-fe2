// URL base da API
const API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

// Seleção do formulário de login e seus inputs 
const formulario = document.querySelector("form"); 
const inputs = document.querySelectorAll("input");

// Dados para login do usuário no aplicativo To-Do
const loginUsuario = {
    email: "",
    password: ""
}

// Envio do formulário
formulario.addEventListener('submit', evento => {
    evento.preventDefault();

    // Validação e normalização dos dados inseridos no formulário de login
    if (verificarPreenchimento(inputs) && validarDados(inputs)) {
        loginUsuario.email = formatarValor(inputs[0].value);
        loginUsuario.password = inputs[1].value;

        // Pedido de login do usuário 
        const configuracaoPedido = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(loginUsuario)
        }

        // Chamando a API
        fetch(`${API_URL}/users/login`, configuracaoPedido)
            .then(respostaInicial => {
                if ((respostaInicial.status === 200) || (respostaInicial.status === 201)) {
                    return respostaInicial.json();
                } else {
                    throw respostaInicial;  // lança a exceção e pula para o catch(), o qual captura o erro
                }
            })
            .then(respostaFinal => loginSucesso(respostaFinal))
            .catch(erro => loginErro(erro));
    } 
});

// Quando a solicitação é bem-sucedida, o usuário recebe um token, o qual é armazenado no sessionStorage.
const loginSucesso = respostaServidor => {
    sessionStorage.setItem("jwt", respostaServidor.jwt);
    window.location = "tasks.html";
}

const loginErro = respostaServidor => {
    console.log("Erro ao logar");
    console.log(respostaServidor);
    alert(`Não foi possível logar, verifique o e-mail e/ou senha. Erro: ${respostaServidor.status}.`);
}