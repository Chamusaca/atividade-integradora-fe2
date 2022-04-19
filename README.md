# 2° Checkpoint de Front-End II

Este é uma aplicativo para criar tarefas (To-Do). As funcionalidades são as seguintes:
* Cadastrar uma conta;
* Entrar com uma conta existente;
* Criar tarefas;
* Vizualizar a lista de tarefas;
* Mover uma tarefa da lista de tarefas pendentes para a lista de tarefas concluídas e vice-versa.
* Excluir uma determinada tarefa.

## Descrição Rápida dos Arquivos

### raiz
* **index.html**: Página de login;
* **signup.html**: Página de cadastro;
* **tasks.html**: Página de tarefas.

### styles
* **access.css**: Responsável pelo layout da página de login e cadastro;
* **common.css**: Responsável por itens de layout comuns entre as páginas da aplicação;
* **skeleton.css**: Responsável pelo layout das animações;
* **tasks.css***: Responsável pelo layout da página de tarefas.

### scripts
* **skeletons.js**: Responsável pelas animações;
* **index.js**: Responsável pela lógica do login do usuário;
* **signup.js**: Responsável pela lógica do cadastro do usuário;
* **tasks.js***: Responsável pela lógica envolvida na criação e/ou manipulação das tarefas;
* **utils.js**: Responsável pela lógica de validação e normalização de dados.

## Cadastro e Acesso 

Algumas validações implementadas aqui pode impedir que o aplicativo seja acessado por contas que foram criadas em outros aplicativos To-Do. Tipicamente, isso
ocorre quando a senha não satisfaz o seguinte critério: *A senha deve ter entre 8 a 15 caracteres com pelo menos uma letra minúscula, uma letra maiúscula, um dígito numérico e um caractere especial (não insira espaço)*.

A aplicação pode ser testada com a seguinte conta fake:
login: nome.sobrenome@webmail.com
seha: Ab12345#

## Desenvolvedores

Os integrantes do Grupo IV são:
* Johnny Pecego
* Pedro Oliveira
* Rafael Oliveira
* Thalles Denner