// Funções para validação dos dados de entrada dos formulários de login e signup

const verificarPreenchimento = inputs => {
    let valorLogico = true;
    for (const input of inputs) {
        valorLogico = input.value.trim() !== "";
        if (!valorLogico) {
            alert("Todos os campos devem ser preenchidos!");
            return false;
        }
    }
    return true;
} 


const exibirErro = (idInput, mensagem, erro=true) => {
    const elementoErro = document.querySelector(`#${idInput}+small`);
    
    if (!erro) {
        elementoErro.innerText = mensagem;
        elementoErro.removeAttribute("hidden", "");
    } else {
        elementoErro.setAttribute("hidden", "");
    }
}


const validarDados = inputs => {
    let regex;
    let tipoInput;
    let valorInput;
    let valorLogico = true;
    const mensagensErros = {
        text: "Apenas letras e espaço são aceitos.",
        email: "Email inválido.",
        password: "A senha deve ter entre 8 a 15 caracteres com pelo menos uma letra minúscula, uma letra maiúscula, um dígito numérico e um caractere especial (não insira espaço).",
    };

    for (const input of inputs) {
        tipoInput = input.type;
        valorInput = input.value;

        switch (tipoInput) {
            case "text":
                regex = /^[a-zA-Z ]{2,50}$/; 
                valorLogico = regex.test(valorInput);
                exibirErro(input.id, mensagensErros.text, valorLogico);
                break
            case "email":
                regex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
                valorLogico = regex.test(valorInput);
                exibirErro(input.id, mensagensErros.email, valorLogico);
                break
            case "password":
                regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
                valorLogico = regex.test(valorInput);
                exibirErro(input.id, mensagensErros.password, valorLogico);
                break
            default:
                console.log(`Não existe regex para avaliar o valor do <input type='${tipoInput}'>.`);
        }
        if (!valorLogico) {
            return false;
        }
    }
    return true;
}


// Funções para normalização dos dados de entrada dos formulários de login e signup

const formatarValor = valor => valor.toLowerCase().trim().replace(/( )+/g, " ");