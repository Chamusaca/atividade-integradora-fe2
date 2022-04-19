// URL base da API
const API_URL = 'https://ctd-todo-api.herokuapp.com/v1';

// Seleção do formulário de cadastro e seus inputs 
const formulario = document.querySelector("form"); 
const inputs = document.querySelectorAll("input");

// Dados para cadastro do usuário no aplicativo To-Do
const cadastroUsuario = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
}

// Envio do formulário
formulario.addEventListener('submit', evento => {
    evento.preventDefault();

    // Validação e normalização dos dados inseridos no formulário de cadastro
    if (verificarPreenchimento(inputs) && validarDados(inputs) && inputs[3].value === inputs[4].value) {
        let indice = 0;

        for (const propriedade in cadastroUsuario) {
            cadastroUsuario[propriedade] = formatarValor(inputs[indice].value);
            indice++;
        }

        cadastroUsuario.password = inputs[inputs.length-1].value;  // retira o efeito da aplicação de formatarValor() na senha

        // Pedido de cadastro do usuário 
        const configuracaoPedido = {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(cadastroUsuario)
        }

        // Chamando a API
        fetch(`${API_URL}/users`, configuracaoPedido)
            .then(respostaInicial => {
                if ((respostaInicial.status === 200) || (respostaInicial.status === 201)) {
                    return respostaInicial.json();
                } else {
                    throw respostaInicial;  // lança a exceção e pula para o catch(), o qual captura o erro
                }
            })
            .then(respostaFinal => cadastroSucesso(respostaFinal))
            .catch(erro => cadastroErro(erro));
    } else if (inputs[3].value !== inputs[4].value) {
        alert("A senha do campo confirmar senha deve ser a mesma do campo senha.");
    }
});

// Quando a solicitação é bem-sucedida, o usuário recebe um token, o qual é armazenado no sessionStorage.
const cadastroSucesso = respostaServidor => {
    sessionStorage.setItem("jwt", respostaServidor.jwt);
    alert("Usuário cadastrado com sucesso.");
    window.location = "index.html";
}

const cadastroErro = respostaServidor => {
    console.log("Erro ao cadastrar");
    console.log(respostaServidor);
    alert(`Não foi possível cadastrar. Erro: ${respostaServidor.status}.`);
}