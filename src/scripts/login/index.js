
    const loginUsuario = {
        email: "",
        password: "",
    };
    
    //Atribui as informações e validadas no Objeto do usuário
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
        loginErro(erro);}
    )}
);

function loginSucesso(jsonRecebido) {
    console.log("Json validado");
    console.log(jsonRecebido);
    window.location = "tarefas.html";
}

function loginErro(statusRecebido) {
    alert("Erro ao logar, email e/ou senha incorretos");
    console.log(statusRecebido);
}